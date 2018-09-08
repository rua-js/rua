import { ObjectOf } from '../core/type/data'

export default function Action(action: string, payload?: any, extras?: any)
{
  return function (target: any, key: string)
  {
    target[key] = function ()
    {
      // @ts-ignore
      const store = global.reduxStore

      if (!store)
      {
        return console.error('[Decorator]Action required global.reduxStore')
      }

      const createdAction: ObjectOf<any> = { type: action }

      if (payload)
      {
        createdAction.payload = payload
      }

      if (extras)
      {
        createdAction.extras = extras
      }

      store.dispatch(createdAction)
    }
  }
}
