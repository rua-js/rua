import * as _ from 'lodash'

export default function Model(classOrConfig: any): any
{
  const instance = new classOrConfig()

  const {
    $$state,
    $$reducers,
    $$dynamic_reducer_names,
    $$effects,
    $$dynamic_effect_names,
    $$subscriptions,
    $$dynamic_subscription_names,
  } = classOrConfig.prototype

  const namespace = _.lowerFirst(classOrConfig.name)

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
