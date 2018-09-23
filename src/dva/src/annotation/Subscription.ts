export default function Effect(target: any, key: string)
{
  const clazz = target.constructor
  let subscriptionObject = Reflect.getMetadata('dva:subscriptions', clazz)

  if (!subscriptionObject)
  {
    subscriptionObject = {}

    Reflect.defineMetadata('dva:subscriptions', subscriptionObject, clazz)
  }

  subscriptionObject[key] = target[key]
}
