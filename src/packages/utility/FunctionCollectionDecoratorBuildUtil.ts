import FunctionCollectionUtil from './FunctionCollectionUtil'

const descriptor = {
  enumerable: true,
  configurable: true,
}

export default class FunctionCollectionDecoratorBuildUtil
{
  public static create(target: any, key: string, fn: Function)
  {
    const fnCollection = FunctionCollectionUtil.create(fn)

    // undefined
    if (target[key])
    {
      // not fnCollection
      if (!FunctionCollectionUtil.is(target[key]))
      {
        const fnCollection = FunctionCollectionUtil.create(fn)
      }
      else
      {

      }
    }

    return {
      enumerable: true,
      configurable: true,
      get()
      {
        return fnCollection
      },
    }
  }
}
