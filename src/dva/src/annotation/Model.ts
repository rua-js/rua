import { ApplicationContext } from '@ruax/core'
import DvaManager from '../DvaManager'
import reducerEnhance from '../enhancement/dvaReducerGenerator'

export default function Model(target: any)
{
  const namespace = target.className || target.name
  const state = Reflect.getMetadata('dva:state', target)
  const reducers = Reflect.getMetadata('dva:reducers', target)
  const effects = Reflect.getMetadata('dva:effects', target)
  const subscriptions = Reflect.getMetadata('dva:subscriptions', target)

  ApplicationContext.get(DvaManager).register({
    namespace,
    state,
    effects,
    subscriptions,
    reducers: { ...reducers, ...reducerEnhance() },
  })
}
