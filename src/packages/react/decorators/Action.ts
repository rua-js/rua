import { ObjectOf } from '../../core/type/data'
import FunctionCollectionDescriptorBuildUtil from '../../utility/FunctionCollectionDescriptorBuildUtil'

export default function Action(action: string, payload?: any, extras?: any): any
{
  return function (target: any, key: string)
  {
    // @ts-ignore
    const store = global.reduxStore

    if (store)
    {
      // const
      return FunctionCollectionDescriptorBuildUtil.create(target, key, () =>
      {
        const createdAction: ObjectOf<any> = { payload, extras, type: action }

        return store.dispatch(createdAction)
      })
    }

    console.error('[Rua][Decorator]Action required global.reduxStore')
  }
}
