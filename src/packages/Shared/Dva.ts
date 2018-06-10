import { AnyObject } from '../Type'
import * as _ from 'lodash'
import { Memory } from '../Memory'

const setState = function (state: AnyObject, action?: any)
{
  return action.payload
}

const mergeState = function (state: AnyObject, action?: any)
{
  /** _.merge will cost more resource */
  return Object.assign(state, action.payload)
}

const deepMergeState = function (state: AnyObject, action?: any)
{
  return _.merge(state, action)
}
const backupState = function (state: AnyObject, action?: any)
{
  // todo: fix keyName
  Memory.set('some', state)

  return state
}
const rollbackState = function (state: AnyObject, action?: any)
{
  // todo: fix keyName
  return Memory.get('some')
}
// const deepBackupState
// const deepRollbackState

export {
  setState,
  mergeState,
  deepMergeState,
}
