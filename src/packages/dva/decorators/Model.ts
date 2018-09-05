import * as _ from 'lodash'
// import {  } from '../../'

export default function Model(classOrConfig: any): any
{
  if ('function' === typeof classOrConfig)
  {
    return ModelWithoutConfig(classOrConfig)
  }

  const {
    reducerEnhance = true,
  } = classOrConfig

  if (reducerEnhance)
  {

  }
}

function ModelWithoutConfig(_class: any): any
{
  const instance = new _class()

  const {
    $$state,
    $$reducers,
    $$dynamic_reducer_names,
    $$effects,
    $$dynamic_effect_names,
    $$subscriptions,
    $$dynamic_subscription_names,
  } = _class.prototype

  const namespace = _.lowerFirst(_class.name)

  // load state
  const state = instance[$$state]

  // load dynamic
  $$dynamic_reducer_names && $$dynamic_reducer_names.forEach((name: string) =>
  {
    $$reducers[name] = instance[name]
  })

  $$dynamic_effect_names && $$dynamic_effect_names.forEach((name: string) =>
  {
    $$effects[name] = instance[name]
  })

  $$dynamic_subscription_names && $$dynamic_subscription_names.forEach((name: string) =>
  {
    $$subscriptions[name] = instance[name]
  })

  return {
    namespace,
    state,
    reducers: $$reducers,
    effects: $$effects,
    subscriptions: $$subscriptions,
  }
}