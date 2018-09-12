import FunctionCollectionUtil from './FunctionCollectionUtil'
import { ObjectOf } from '../core/type/data'

const descriptorTemplate: PropertyDescriptor = {
  enumerable: true,
  configurable: true,
}

export default class FunctionCollectionDescriptorBuildUtil
{
  public static create(
    target: ObjectOf<any>,
    key: string,
    descriptor: PropertyDescriptor | undefined,
    fn: Function,
  ): PropertyDescriptor
  {
    let fnCollection: any

    const oldFn = descriptor && descriptor.get && descriptor.get() || target[key]

    // undefined
    if (oldFn)
    {
      // not fnCollection
      if (!FunctionCollectionUtil.is(oldFn))
      {
        fnCollection = FunctionCollectionUtil.create(fn)

        fnCollection.append(oldFn)
      }
      else
      {
        fnCollection = oldFn

        fnCollection.prepend(fn)
      }
    } else
    {
      fnCollection = FunctionCollectionUtil.create(fn)
    }

    descriptorTemplate.get = function ()
    {
      return fnCollection.bind(this)
    }
    descriptorTemplate.set = function (fn)
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

    return descriptorTemplate
  }
}
