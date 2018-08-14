import * as _ from 'lodash'
import { Memory } from '../memory'
import { isPlainObject } from '../request/util'
import { AnyObject } from '../core/type/data'
import * as Immutable from 'seamless-immutable'

// - start
const prefix = 'dva-model-backup-'

function assignState(state: AnyObject, action?: any): AnyObject
{
  const { payload } = action

  // seamless-immutable support
  // force immutable object if origin state is immutable
  if (Immutable.isImmutable(state) && !Immutable.isImmutable(payload))
  {
    return Immutable(payload)
  }

  return payload
}

function setState(state: AnyObject, action?: any): AnyObject
{
  const { payload } = action

  // seamless-immutable support
  if (Immutable.isImmutable(state))
  {
    return state.merge(payload)
  }

  return { ...state, ...payload }
}

function mergeState(state: AnyObject, action?: any): AnyObject
{
  const { payload } = action

  // seamless-immutable support
  if (Immutable.isImmutable(state))
  {
    return state.merge(payload, { deep: true })
  }

  // clone root object
  const outState = { ..._.merge(state, action.payload) }

  // clone one level deeper to trigger reference change
  for (const key in action.payload)
  {
    const outValue = outState[key]
    if (Array.isArray(outValue))
    {
      outState[key] = [...outValue]
    } else if (isPlainObject(outValue))
    {
      outState[key] = { ...outValue }
    }
  }

  return outState
}

function clearState(state: AnyObject, action?: any): AnyObject
{
  // seamless-immutable support
  // force immutable object if origin state is immutable
  if (Immutable.isImmutable(state))
  {
    return Immutable({})
  }

  return {}
}

function backupState(state: AnyObject, action?: any): AnyObject
{
  const namespace = action.type.split('/')[0]

  // seamless-immutable support
  if (Immutable.isImmutable(state))
  {
    // no need to deep clone state when it's immutable
    Memory.set(`${prefix}${namespace}`, state)
  }
  else
  {
    Memory.set(`${prefix}${namespace}`, _.clone(state))
  }

  return state
}

function rollbackState(state: AnyObject, action?: any): AnyObject
{
  const namespace = action.type.split('/')[0]

  // seamless-immutable support
  if (Immutable.isImmutable(state))
  {
    // no need to deep lone state when it's immutable
    return Memory.get(`${prefix}${namespace}`)
  }

  return _.clone(
    Memory.get(`${prefix}${namespace}`),
  )
}

export default function dvaReducerGenerator(defaultState?: Function)
{
  const _defaultState = defaultState!

  function resetState(state: AnyObject, actions?: any): AnyObject
  {
    const { payload: key } = actions

    if (!key)
    {
      return { ...state, ..._defaultState() }
    }

    if (Array.isArray(key))
    {
      const otherState: AnyObject = {}
      const defaultState = _defaultState()
      key.forEach((k) =>
      {
        otherState[k] = defaultState[k]
      })

      return Object.assign(state, otherState)
    }

    return Object.assign(state, {
      [key]: _defaultState()[key],
    })
  }

  return {
    setState,
    resetState,
    mergeState,
    assignState,
    clearState,
    backupState,
    rollbackState,
  }
}
