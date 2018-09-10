import { ObjectOf } from '../../core/type/data'

export default function DecreaseState(stateKey: string): any
{
  return function (target: any, key: string): any
  {
    if (target[key])
    {
      return console.error('[Decorator]SetState will override original function')
    }

    Object.defineProperty(target, key, {
      get()
      {
        return function ()
        {
          // @ts-ignore
          return (this.setState as Function)((state: any) =>
          {
            return {
              [stateKey]: !state[stateKey],
            }
          })
        }.bind(this)
      },
    })
  }
}
