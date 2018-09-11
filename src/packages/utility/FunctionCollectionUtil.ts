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
      add(fn: Function)
      {
        // @ts-ignore
        functionCollection.fnList.push(fn)

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
      functionCollection.add(initialFn)
    }

    const callableFunction = function functionCollection()
    {
      // @ts-ignore
      functionCollection.fnList.forEach(fn => fn())
    }

    return Object.assign(callableFunction, functionCollection)
  }
}
