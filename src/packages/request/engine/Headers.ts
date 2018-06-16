/**
 * HTTP Headers.
 */

import { each, trim, toLower } from '../util'
import AnyObject from '../../type/data/AnyObject'

export default class Headers
{

  public map: AnyObject

  constructor(headers)
  {

    this.map = {}

    each(headers, (value: any, name: string) => this.append(name, value))
  }

  public has(name: string)
  {
    return getName(this.map, name) !== null
  }

  public get(name: string)
  {

    const list = this.map[getName(this.map, name)]

    return list ? list.join() : null
  }

  public getAll(name: string)
  {
    return this.map[getName(this.map, name)] || []
  }

  public set(name, value)
  {
    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)]
  }

  public append(name, value)
  {

    const list = this.map[getName(this.map, name)]

    if (list)
    {
      list.push(trim(value))
    } else
    {
      this.set(name, value)
    }
  }

  public delete(name)
  {
    delete this.map[getName(this.map, name)]
  }

  public deleteAll()
  {
    this.map = {}
  }

  public forEach(callback: Function, thisArg)
  {
    each(this.map, (list, name) =>
    {
      each(list, value => callback.call(thisArg, value, name, this))
    })
  }

}

function getName(map, name)
{
  return Object.keys(map).reduce((prev, curr) =>
  {
    return toLower(name) === toLower(curr) ? curr : prev
  }, null)
}

function normalizeName(name)
{

  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name))
  {
    throw new TypeError('Invalid character in header field name')
  }

  return trim(name)
}
