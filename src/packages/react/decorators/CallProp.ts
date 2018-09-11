import FunctionCollectionDescriptorBuildUtil from '../../utility/FunctionCollectionDescriptorBuildUtil'

export default function CallProp(propKey: string): any
{
  return (target: any, key: string) =>
  {
    if (target[key])
    {
      console.warn('[Decorator]CallProp will override original function')
    }

    return FunctionCollectionDescriptorBuildUtil.create(target, key, function (...props: any[])
    {
      // @ts-ignore
      const fn = this.props[propKey]

      return fn && fn(...props)
    })
  }
}
