import { ObjectOf } from '../../rua/type/data'
import FunctionCollectionDescriptorBuildUtil from '../../rua/util/FunctionCollectionDescriptorBuildUtil'

export default function SetState(stateKey: string | ObjectOf<any> | string[], stateValue?: any): any
{
  return function (target: any, key: string, descriptor: PropertyDescriptor)
  {
    if (target[key])
    {
      return console.error('[Decorator]SetState will override original function')
    }

    return FunctionCollectionDescriptorBuildUtil.create(
      target,
      key,
      descriptor,
      function (...args: any[])
      {
        // key-value mode
        if (undefined !== stateValue)
        {
          // @ts-ignore
          return this.setState({
            [(stateKey as string)]: stateValue,
          })
        }

        // projection mode
        if (Array.isArray(stateKey))
        {
          const stateObject: ObjectOf<any> = {}

          stateKey.forEach((key: string, index: number) =>
          {
            stateObject[key] = args[index]
          })

          // @ts-ignore
          return this.setState(stateObject)
        }

        // object mode
        // @ts-ignore
        return this.setState(stateKey)
      })
  }
}
