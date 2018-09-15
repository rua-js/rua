import FunctionCollectionDescriptorBuildUtil from '../rua/util/FunctionCollectionDescriptorBuildUtil'

export default function HOF(target: any, key: string, descriptor: PropertyDescriptor): any
{
  const oldFunction = descriptor && descriptor.get && descriptor.get() || target[key]

  return FunctionCollectionDescriptorBuildUtil.create(target, key, undefined, function ()
  {
    return oldFunction
  })

  // return {
  //   enumerable: true,
  //   configurable: true,
  //   get()
  //   {
  //     return function (...args: any[])
  //     {
  //       // @ts-ignore
  //       return oldFunction.bind(this, ...args)
  //     }
  //   },
  //   set(value: any)
  //   {
  //     // @ts-ignore
  //     this[key] = value
  //   },
  // }
}
