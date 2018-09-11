export default function HOF(target: any, propertyName: string)
{
  const oldFunction = target[propertyName]

  return {
    enumerable: true,
    configurable: true,
    get()
    {
      return function (...args: any[])
      {
        // @ts-ignore
        return oldFunction.bind(this, ...args)
      }
    },
    set(value: any)
    {
      // @ts-ignore
      this[propertyName] = value
    },
  }
}
