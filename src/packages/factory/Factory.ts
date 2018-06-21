import { AnyObject } from '../../packages/type/data'
import * as faker from 'faker'

class Factory
{
  protected callback: AnyObject = {}

  protected counts: AnyObject = {}

  protected wrappers: AnyObject = {}

  public define(identifier: string, callback: Function, count: number, wrapper?: Function)
  {
    this.callback[identifier] = callback
    this.counts[identifier] = count
    this.wrappers[identifier] = wrapper
  }

  public has(identifier: string)
  {
    return !!this.callback[identifier]
  }

  public make(identifier: string)
  {
    let i = 1
    const returnValue = []
    while (i <= this.counts[identifier])
    {
      returnValue.push(this.callback[identifier](faker))
      i += 1
    }

    const wrapper = this.wrappers[identifier]

    if (wrapper)
    {
      return wrapper(returnValue)
    }

    return returnValue
  }
}

// factory.define('user.readAll', () => {}, 1)

export default Factory
