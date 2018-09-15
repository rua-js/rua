import FunctionCollectionDescriptorBuildUtil from '../../rua/util/FunctionCollectionDescriptorBuildUtil'

export default function DecreaseState(stateKey: string): any
{
  return function (target: any, key: string, descriptor: PropertyDescriptor): any
  {
    if (target[key])
    {
      return console.error('[Decorator]SetState will override original function')
    }

    return FunctionCollectionDescriptorBuildUtil.create(target, key, descriptor, function ()
    {
      // @ts-ignore
      return (this.setState as Function)((state: any) =>
      {
        return {
          [stateKey]: !state[stateKey],
        }
      })
    })
  }
}
