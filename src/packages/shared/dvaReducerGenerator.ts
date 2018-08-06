import * as _ from 'lodash'
import { Memory } from '../memory'
import { isPlainObject } from '../request/util'
import { AnyObject } from '../type/data'

//- start
const prefix = 'dva-model-backup-'

function assignState(state: AnyObject, action?: any): AnyObject
{
  return action.payload
}

function setState(state: AnyObject, action?: any): AnyObject
{
  return { ...state, ...action.payload }
}

function mergeState(state: AnyObject, action?: any): AnyObject
{
  const outState = { ..._.merge(state, action.payload) }

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
  return {}
}

function backupState(state: AnyObject, action?: any): AnyObject
{
  const namespace = action.type.split('/')[0]

  Memory.set(`${prefix}${namespace}`, state)

  return state
}

function rollbackState(state: AnyObject, action?: any): AnyObject
{
  const namespace = action.type.split('/')[0]

  return <AnyObject>Memory.get(`${prefix}${namespace}`)
}

function deepBackupState(state: AnyObject, action?: any): AnyObject
{
  const namespace = action.type.split('/')[0]

  Memory.set(`${prefix}${namespace}`, _.clone(state))

  return state
}

function deepRollbackState(state: AnyObject, action?: any): AnyObject
{
  const namespace = action.type.split('/')[0]

  Memory.get(`${prefix}${namespace}`)

  return <AnyObject>Memory.get(`${prefix}${namespace}`)
}

export default function dvaReducerGenerator(defaultState: Function)
{
  const _defaultState = defaultState

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
    deepBackupState,
    deepRollbackState,
  }
}
