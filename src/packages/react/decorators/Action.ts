import { ObjectOf } from '../../core/type/data'

export default function Action(action: string, payload?: any, extras?: any): any
{
  return function (target: any, key: string)
  {
    // @ts-ignore
    const store = global.reduxStore

    if (store)
    {
      return {
        enumerable: true,
        get()
        {
          return function ()
          {
            const createdAction: ObjectOf<any> = { type: action }

            if (payload)
            {
              createdAction.payload = payload
            }

            if (extras)
            {
              createdAction.extras = extras
            }

            return store.dispatch(createdAction)
          }
        },
      }
    }

    console.error('[Rua][Decorator]Action required global.reduxStore')
  }
}
