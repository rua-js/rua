import { ObjectOf } from '../core/type/data'

export default function SetState(stateKey: string | ObjectOf<any> | string[], stateValue?: any)
{
  return function (target: any, key: string)
  {
    if (target[key])
    {
      return console.error('[Decorator]SetState will override original function')
    }

    Object.defineProperty(target, key, {
      get()
      {
        return function (...args: any[])
        {
          // key-value mode
          if (stateValue)
          {
            // @ts-ignore
            return this.setState(stateKey, stateValue)
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
        }
      },
    })
  }
}
