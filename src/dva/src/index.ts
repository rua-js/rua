import { ApplicationContext } from '@ruax/core'
import DvaManager from './DvaManager'

export { Model, Effect, State, Reducer, Subscription } from './annotation'
export const dvaManager = ApplicationContext.get(DvaManager)
export const action = dvaManager.dvaAction
