export default function Effect(target: any, key: string)
{
  const clazz = target.constructor
  let effectObject = Reflect.getMetadata('dva:effects', clazz)

  if (!effectObject)
  {
    effectObject = {}

    Reflect.defineMetadata('dva:effects', effectObject, clazz)
  }

  effectObject[key] = target[key]
}
