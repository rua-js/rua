import { ObjectOf } from '../../rua/type/data'
import FunctionCollectionDescriptorBuildUtil from '../../rua/util/FunctionCollectionDescriptorBuildUtil'

export default function Action(action: string, payload?: any, extras?: any): any
{
  return function (target: any, key: string, descriptor: PropertyDescriptor)
  {
    // const
    return FunctionCollectionDescriptorBuildUtil.create(target, key, descriptor, function ()
    {
      // @ts-ignore
      const store = global.reduxStore

      if (store)
      {
        const createdAction: ObjectOf<any> = { payload, extras, type: action }

        return store.dispatch(createdAction)
      }

      console.error('[Rua][Decorator]Action required global.reduxStore')
    })
  }
}
