import { AnyObject } from '../type/data'

export const emptyArray = Object.freeze([])

export const emptyObject: AnyObject = Object.freeze({})

export function fnEmptyArray()
{
  return emptyArray
}

export function fnEmptyObject()
{
  return emptyObject
}

export const noop = () =>
{
}

export const core = 'hsy'
