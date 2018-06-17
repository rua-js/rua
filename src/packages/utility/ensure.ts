import { AnyData, AnyObject } from '../type/data'
import * as _ from 'lodash'

export default function ensure(value: AnyData, fixValue: AnyData)
{
  return value ? value : fixValue
}

export function ensureObject(value: AnyData, fixValue: AnyObject = {})
{
  const type = typeof value

  return value !== null && (type === 'object' || type === 'function')
}

export function ensureObjectLike(value: AnyData, fixValue: AnyData = {})
{

}

export function ensurePlainObject(value: AnyData, fixValue: AnyData = {}) {

}

export function ensureArray(value: AnyData, fixValue: AnyData = [])
{

}

export function ensureArrayLike(value: AnyData, fixValue: AnyData = [])
{

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
