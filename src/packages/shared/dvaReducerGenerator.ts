import * as _ from 'lodash'
import { memory } from '../memory'
import { AnyObject } from '../type/data'

const dvaReducerGenerator = (defaultState: Function) =>
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

  const mergeState = function (state: AnyObject, action?: any): AnyObject
  {
    /** _.merge will cost more resource */
    return { ...state, ...action.payload }
  }

  const deepMergeState = function (state: AnyObject, action?: any): AnyObject
  {
    const outState = { ..._.merge(state, action.payload) }

    for (const key in action.payload)
    {
      outState[key] = { ...outState[key] }
    }

    return outState
  }

  const clearState = function (state: AnyObject, action?: any): AnyObject
  {
    return {}
  }

  const backupState = function (state: AnyObject, action?: any): AnyObject
  {
    const namespace = action.type.split('/')[0]

    memory.set(`${prefix}${namespace}`, state)

    return state
  }

  const rollbackState = function (state: AnyObject, action?: any): AnyObject
  {
    const namespace = action.type.split('/')[0]

    return <AnyObject>memory.get(`${prefix}${namespace}`)
  }

  const deepBackupState = function (state: AnyObject, action?: any): AnyObject
  {
    const namespace = action.type.split('/')[0]

    memory.set(`${prefix}${namespace}`, _.clone(state))

    return state
  }

  const deepRollbackState = function (state: AnyObject, action?: any): AnyObject
  {
    const namespace = action.type.split('/')[0]

    memory.get(`${prefix}${namespace}`)

    return <AnyObject>memory.get(`${prefix}${namespace}`)
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
