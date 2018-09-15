import { ObjectOf } from '../../core/type/data'

export default function Body(jwt: string | Function)
{
  return function (target: any, key: string)
  {
    if (!target.__apiList)
    {
      target.__apiList = {}
    }

    if (!target.__apiList[key])
    {
      target.__apiList[key] = {}
    }

    if (!target[key])
    {
      Object.defineProperty(target, key, {
        set(url)
        {
          target.__apiList[key].url = url
        },
        get()
        {
          return true
        },
      })
    }

    if (!target.__apiList[key].headers)
    {
      target.__apiList[key].headers = {}
    }

    const authorization: string = 'function' === typeof jwt
      ? jwt()
      : jwt

    target.__apiList[key].headers.authorization = jwt
  }
}
