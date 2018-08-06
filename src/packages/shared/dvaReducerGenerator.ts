import * as _ from 'lodash'
import { Memory } from '../memory'
import { isPlainObject } from '../request/util'
import { AnyObject } from '../type/data'

function setState(state: AnyObject, action?: any): AnyObject
{
  return action.payload
}

function mergeState(state: AnyObject, action?: any): AnyObject
{
  return { ...state, ...action.payload }
}

function deepMergeState(state: AnyObject, action?: any): AnyObject
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

export default function dvaReducerGenerator(defaultState: Function)
{
  const _defaultState = defaultState
  const prefix = 'dva-model-backup-'

  const resetState = function (state: AnyObject, actions?: any): AnyObject
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


  const backupState = function (state: AnyObject, action?: any): AnyObject
  {
    const namespace = action.type.split('/')[0]

    Memory.set(`${prefix}${namespace}`, state)

    return state
  }

  const rollbackState = function (state: AnyObject, action?: any): AnyObject
  {
    const namespace = action.type.split('/')[0]

    return <AnyObject>Memory.get(`${prefix}${namespace}`)
  }

  const deepBackupState = function (state: AnyObject, action?: any): AnyObject
  {
    const namespace = action.type.split('/')[0]

    Memory.set(`${prefix}${namespace}`, _.clone(state))

    return state
  }

  const deepRollbackState = function (state: AnyObject, action?: any): AnyObject
  {
    const namespace = action.type.split('/')[0]

    Memory.get(`${prefix}${namespace}`)

    return <AnyObject>Memory.get(`${prefix}${namespace}`)
  }

  return {
    setState,
    resetState,
    mergeState,
    deepMergeState,
    clearState,
    backupState,
    rollbackState,
    deepBackupState,
    deepRollbackState,
  }
}
