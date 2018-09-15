import { DecreaseStateConfigParameter } from '../types'
import { ObjectOf } from '../../core/type/data'
import FunctionCollectionDescriptorBuildUtil from '../../rua/util/FunctionCollectionDescriptorBuildUtil'

export default function DecreaseState(stateKeyOrConfig: string | DecreaseStateConfigParameter): any
{
  return function (target: any, key: string, descriptor: PropertyDescriptor): any
  {
    if (target[key])
    {
      return console.error('[Decorator]DecreaseState will override original function')
    }

    return FunctionCollectionDescriptorBuildUtil.create(
      target,
      key,
      descriptor,
      function ()
      {
        if ('string' === typeof stateKeyOrConfig)
        {
          // @ts-ignore
          return (this.setState as Function)((state: ObjectOf<any>) =>
          {
            return {
              [stateKeyOrConfig]: state[stateKeyOrConfig] - 1,
            }
          })
        }

        const {
          key,
          step = 1,
          min,
        } = stateKeyOrConfig

        // @ts-ignore
        return (this.setState as Function)((state: any) =>
        {
          const currentValue = state[key]

          if (undefined !== min && currentValue < min)
          {
            return {
              [key]: min,
            }
          }

          let newValue = state[key] - step

          if (undefined !== min && newValue < min)
          {
            newValue = min
          }

          return {
            [key]: newValue,
          }
        })
      })
  }
}
