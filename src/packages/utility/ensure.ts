import { AnyData, AnyObject } from '../type/data'

export default function ensure(check: AnyData, fixValue: AnyData)
{
  return check ? check : fixValue
}

export function ensureObject(check: AnyData, fixValue: AnyObject)
{

}

export function ensureObjectLike(check: AnyData, fixValue: AnyData)
{

}