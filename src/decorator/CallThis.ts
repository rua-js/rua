import FunctionCollectionDescriptorBuildUtil from '../rua/util/FunctionCollectionDescriptorBuildUtil'

export default function CallThis(targetPropertyKey?: string)
{
  return function (target: Object, key: string, descriptor: PropertyDescriptor)
  {
    const createDescriptor = FunctionCollectionDescriptorBuildUtil.create

    if (undefined !== targetPropertyKey)
    {
      return createDescriptor(target, key, descriptor, function (...args: any[])
      {
        // @ts-ignore
        return this[targetPropertyKey](...args)
      })
    }

    return createDescriptor(target, key, descriptor, function (...args: any[])
    {
      // @ts-ignore
      return this[targetPropertyKey](...args)
    })
  }
}
