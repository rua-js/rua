import { AnyObject } from '../Type'
import * as _ from 'lodash'
import { Memory } from '../Memory'

const dvaReducerGenerator = (defaultState: AnyObject) =>
{
  const _defaultState = defaultState
  const prefix = 'dva-model-backup-'

  const setState = function (state: AnyObject, action?: any): AnyObject
  {
    return action.payload
  }

  const resetState = function (state: AnyObject, actions?: any): AnyObject
  {
    const { payload: key } = actions

    if (!key)
    {
      return _.clone(state)
    }

    return Object.assign(state, {
      [key]: _defaultState[key],
    })
  }

  const mergeState = function (state: AnyObject, action?: any): AnyObject
  {
    /** _.merge will cost more resource */
    return Object.assign(state, action.payload)
  }

  const deepMergeState = function (state: AnyObject, action?: any): AnyObject
  {
    return _.merge(state, action.payload)
  }

  const clearState = function (state: AnyObject, action?: any): AnyObject
  {
    return {}
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

export default dvaReducerGenerator
