export default function CallPropHOF(propKey: string)
{
  return (target: any, key: string) =>
  {
    if (target[key])
    {
      console.warn('[Decorator]CallProp will override original function')
    }

    target[key] = function (...props: any[])
    {
      const fn = this.props[propKey]

      return function ()
      {
        return fn && fn(...props)
      }
    }
  }
}
