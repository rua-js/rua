import * as Immutable from 'seamless-immutable'
import { AnyObject, AnyArray } from '../core/type/data'

export const EMPTY_ARRAY = Object.freeze([])

export const EMPTY_IMMUTABLE_ARRAY = Immutable([])

export const EMPTY_OBJECT: AnyObject = Object.freeze({})

export const EMPTY_IMMUTABLE_OBJECT: AnyObject = Immutable({})

export function emptyArrayFn()
{
  return EMPTY_ARRAY
}

export function emptyImmutableArrayFn()
{
  return EMPTY_IMMUTABLE_ARRAY
}

export function emptyObjectFn()
{
  return EMPTY_OBJECT
}

export function emptyImmutableObjectFn()
{
  return EMPTY_IMMUTABLE_OBJECT
}

export function noop()
{
}

export const core = 'hsy'
