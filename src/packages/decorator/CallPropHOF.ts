export default function CallPropHOF(propKey: string)
{
  return (target: any, key: string) =>
  {
    if (target[key])
    {
      console.warn('[Decorator]CallProp will override original function')
    }

    Object.defineProperty(target, key, {
      get()
      {
        return function (...props: any[])
        {
          // @ts-ignore
          const fn = this.props[propKey]

          return function ()
          {
            return fn && fn(...props)
          }
        }.bind(this)
      },
    })
  }
}
