import { AnyData, AnyObject } from '../../core/type/data'
import * as _ from 'lodash'

const _toString = Object.prototype.toString

export function ensure(value: AnyData, fixValue: AnyData)
{
  return value ? value : fixValue
}

export function ensureObject(value: AnyData, fixValue: AnyObject = {})
{
  const type = typeof value

  return null !== value && ('object' === type || 'function' === type)
    ? value
    : fixValue
}

export function ensureObjectLike(value: AnyData, fixValue: AnyData = {})
{
  return _.isObjectLike(value) ? value : fixValue
}

export function ensurePlainObject(value: AnyData, fixValue: AnyData = {})
{
  return '[object Object]' === _toString.call(value) ? value : fixValue
}

export function ensureArray(value: AnyData, fixValue: AnyData = [])
{
  return Array.isArray(value) ? value : fixValue
}

export function ensureArrayLike(value: AnyData, fixValue: AnyData = [])
{
  return _.isArrayLike(value) ? value : fixValue
}

export function ensureBoolean(value: AnyData, fixValue?: AnyData)
{
  if (true === value || false === value)
  {
    return value
  }

  return fixValue !== undefined
    ? fixValue
    : !!value
}

export function ensureSymbol(value: AnyData, fixValue: AnyData = Symbol())
{
  return 'symbol' === typeof value
    ? value
    : fixValue
}

export function ensureInteger(value: AnyData, fixValue: AnyData)
{
  return Number.isInteger(value)
    ? value
    : fixValue
}

export function ensureNumber(value: AnyData, fixValue: AnyData)
{
  return 'number' === typeof value || '[object Object]' === _toString.call(value)
    ? value
    : fixValue
}

// export function ensureDate(value: AnyData, fixValue: Date = new Date)
// {
//   return typeof value === 'Date'
// }
