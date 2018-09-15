
export default function Url(url: string)
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

    target.__apiList[key].url = url
  }
}
