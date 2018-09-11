import { ObjectOf } from '../../core/type/data'
import FunctionCollectionDescriptorBuildUtil from '../../utility/FunctionCollectionDescriptorBuildUtil'

export default function DecreaseState(stateKey: string): any
{
  return function (target: any, key: string): any
  {
    if (target[key])
    {
      return console.error('[Decorator]SetState will override original function')
    }

    return FunctionCollectionDescriptorBuildUtil.create(target, key, function ()
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
