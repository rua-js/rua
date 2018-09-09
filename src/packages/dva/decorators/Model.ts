import { dvaReducerGenerator } from '../utils'

export default function Model(_class: any): any
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

  let namespace

  if (!_class.getName)
  {
    namespace = _class.name.toLowerCase()
  }
  else if ('string' === typeof _class.getName)
  {
    namespace = _class.getName
  }
  else if ('function' === typeof _class.getName)
  {
    namespace = _class.getName()
  }

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
    reducers: { ...dvaReducerGenerator(), ...$$reducers },
    effects: $$effects,
    subscriptions: $$subscriptions,
  }
}

function registerModel()
{

}
