export default function CallProp(propKey: string)
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

      return fn && fn(...props)
    }
  }
}
