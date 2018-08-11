import { AnyObject, AnyArray } from '../core/type/data'

export const EMPTY_ARRAY = Object.freeze([])

export const EMPTY_OBJECT: AnyObject = Object.freeze({})

export function emptyArrayFn()
{
  return EMPTY_ARRAY
}

export function emptyObjectFn()
{
  return EMPTY_OBJECT
}

export function noop()
{
}

export const core = 'hsy'
