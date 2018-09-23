export default function Effect(target: any, key: string)
{
  const clazz = target.constructor
  let reducerObject = Reflect.getMetadata('dva:reducers', clazz)

  if (!reducerObject)
  {
    reducerObject = {}

    Reflect.defineMetadata('dva:reducers', reducerObject, clazz)
  }

  reducerObject[key] = target[key]
}
