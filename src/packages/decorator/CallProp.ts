export default function CallProp(propKey: string)
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

          return fn && fn(...props)
        }.bind(this)
      },
    })
  }
}
