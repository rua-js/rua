import { AnyObject } from '../Type'
import * as _ from 'lodash'
import { Memory } from '../Memory'

const setState = function (state: AnyObject, action?: any): AnyObject
{
  return action.payload
}

const mergeState = function (state: AnyObject, action?: any): AnyObject
{
  /** _.merge will cost more resource */
  return Object.assign(state, action.payload)
}

const deepMergeState = function (state: AnyObject, action?: any): AnyObject
{
  return _.merge(state, action)
}

const backupState = function (state: AnyObject, action?: any): AnyObject
{
  // todo: fix keyName
  Memory.set('backup', state)

  return state
}
const rollbackState = function (state: AnyObject, action?: any): AnyObject
{
  // todo: fix keyName
  return <AnyObject>Memory.get('backup')
}
// const deepBackupState
// const deepRollbackState

export {
  setState,
  mergeState,
  deepMergeState,
}
