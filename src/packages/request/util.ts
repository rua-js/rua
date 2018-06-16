import { AnyObject } from '../type/data'

const dev = process.env.NODE_ENV !== 'production'
const { hasOwnProperty } = {}
const { slice } = []

export function warn(msg: string)
{
  if (typeof console !== 'undefined' && dev)
  {
    console.warn('[RuaRequest warn]: ' + msg)
  }
}

export function error(msg: string)
{
  if (typeof console !== 'undefined')
  {
    console.error(msg)
  }
}

export function trim(str: string)
{
  return str ? str.replace(/^\s*|\s*$/g, '') : ''
}

export function trimEnd(str: string, chars: string)
{

  if (str && chars === undefined)
  {
    return str.replace(/\s+$/, '')
  }

  if (!str || !chars)
  {
    return str
  }

  return str.replace(new RegExp(`[${chars}]+$`), '')
}

export function toLower(str: string)
{
  return str ? str.toLowerCase() : ''
}

export function toUpper(str: string)
{
  return str ? str.toUpperCase() : ''
}

export const isArray = Array.isArray

export function isString(val: string)
{
  return typeof val === 'string'
}

export function isBoolean(val: boolean)
{
  return val === true || val === false
}

export function isFunction(val: Function)
{
  return typeof val === 'function'
}

export function isObject(obj: AnyObject)
{
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj: AnyObject)
{
  return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype
}

export function isBlob(obj: AnyObject)
{
  return typeof Blob !== 'undefined' && obj instanceof Blob
}

export function isFormData(obj: AnyObject)
{
  return typeof FormData !== 'undefined' && obj instanceof FormData
}

export function each(obj: AnyObject, iterator: Function)
{

  let i
  let key

  if (isArray(obj))
  {
    for (i = 0; i < obj.length; i += 1)
    {
      iterator.call(obj[i], obj[i], i)
    }
  } else if (isObject(obj))
  {
    for (key in obj)
    {
      if (hasOwnProperty.call(obj, key))
      {
        iterator.call(obj[key], obj[key], key)
      }
    }
  }

  return obj
}
