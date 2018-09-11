import FunctionCollectionUtil from './FunctionCollectionUtil'

const descriptor: PropertyDescriptor = {
  enumerable: true,
  configurable: true,
}

export default class FunctionCollectionDescriptorBuildUtil
{
  public static create(target: any, key: string, fn: Function)
  {
    let fnCollection: any

    // undefined
    if (target[key])
    {
      // not fnCollection
      if (!FunctionCollectionUtil.is(target[key]))
      {
        const oldFn = target[key]

        fnCollection = FunctionCollectionUtil.create(fn)

        fnCollection.append(oldFn)
      }
      else
      {
        fnCollection = target[key]

        fnCollection.prepend(fn)
      }
    } else
    {
      fnCollection = FunctionCollectionUtil.create(fn)
    }

    descriptor.get = function ()
    {
      return fnCollection.bind(this)
    }

    descriptor.set = function (fn)
    {
      if ('function' !== typeof fn)
      {
        return console.error(
          `[Rua][FunctionCollectionDecoratorBuildUtil]:the value
             passed to property '${key}' should be function`,
        )
      }

      fnCollection.append(fn)
    }

    return descriptor
  }
}
