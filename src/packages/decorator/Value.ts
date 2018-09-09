import { Cache } from '../cache'

export default function Value(valueConfig: string | Function)
{
  if ('function' === typeof valueConfig)
  {
    return setValue(valueConfig())
  }

  // From system
  if ((valueConfig as string).startsWith('${') && (valueConfig as string).endsWith('}'))
  {
  }

  // From config
  if ((valueConfig as string).startsWith('#{') && (valueConfig as string).endsWith('}'))
  {

  }

  // From cache
  if ((valueConfig as string).startsWith('@{') && (valueConfig as string).endsWith('}'))
  {
    return setValue(() => Cache.get(valueConfig.substr(2, valueConfig.length - 3)))
  }

}

function setValue(data: any)
{
  return function (target: any, key: string, descriptor: any)
  {
    Object.defineProperty(target, key, {
      enumerable: true,
      get()
      {
        return data
      },
      set()
      {
        console.error(`Read-only property: ${key}`)
      },
    })

    return descriptor
  }
}
