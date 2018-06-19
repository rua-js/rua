import { AnyData, AnyObject } from '../type/data'
import * as _ from 'lodash'

const _toString = Object.prototype.toString

export function ensure(value: AnyData, fixValue: AnyData)
{
  return value ? value : fixValue
}

export function ensureObject(value: AnyData, fixValue: AnyObject = {})
{
  const type = typeof value

  return value !== null && (type === 'object' || type === 'function')
    ? value
    : fixValue
}

export function ensureObjectLike(value: AnyData, fixValue: AnyData = {})
{
  return _.isObjectLike(value) ? value : fixValue
}

export function ensurePlainObject(value: AnyData, fixValue: AnyData = {})
{
  return _toString.call(value) === '[object Object]' ? value : fixValue
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

  return fixValue
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
  return typeof value === 'number' || _toString.call(value) === '[object Object]'
    ? value
    : fixValue
}

// export function ensureDate(value: AnyData) {
//
// }
