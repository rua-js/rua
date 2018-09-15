import FunctionCollectionDescriptorBuildUtil from '../../rua/util/FunctionCollectionDescriptorBuildUtil'

export default function CallProp(propKey: string): any
{
  return (target: any, key: string, descriptor: PropertyDescriptor) =>
  {
    if (target[key])
    {
      console.warn('[Decorator]CallProp will override original function')
    }

    return FunctionCollectionDescriptorBuildUtil.create(target, key, descriptor, function (...props: any[])
    {
      // @ts-ignore
      const fn = this.props[propKey]

      return fn && fn(...props)
    })
  }
}
