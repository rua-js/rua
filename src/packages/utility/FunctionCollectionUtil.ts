export default class FunctionCollectionUtil
{
  public static is(object: any)
  {
    return object.__functionCollectionUtil
  }

  public static create(initialFn?: Function)
  {
    const functionCollection = {
      fnList: [],
      append(fn: Function)
      {
        // @ts-ignore
        functionCollection.fnList.push(fn)

        return this
      },
      prepend(fn: Function)
      {
        // @ts-ignore
        functionCollection.fnList.unshift(fn)

        return this
      },
      invoke(): any
      {
        // @ts-ignore
        return this()
      },
      __functionCollectionUtil: true,
    }

    if (initialFn)
    {
      functionCollection.append(initialFn)
    }

    const callableFunction = function functionCollection()
    {
      // @ts-ignore
      functionCollection.fnList.forEach(fn => fn())
    }

    return Object.assign(callableFunction, functionCollection)
  }
}
