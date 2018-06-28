import * as faker from 'faker'
import { ObjectOf } from '../../packages/type/data'

class Factory
{
  protected callbacks: ObjectOf<Function> = {}

  protected counts: ObjectOf<number> = {}

  protected wrappers: ObjectOf<Function | undefined> = {}

  public define(identifier: string, callback: Function, count: number, wrapper?: Function)
  {
    this.callbacks[identifier] = callback
    this.counts[identifier] = count
    this.wrappers[identifier] = wrapper
  }

  public has(identifier: string)
  {
    return !!this.callbacks[identifier]
  }

  public make(identifier: string)
  {
    let i = 1
    const returnValue = []
    while (i <= this.counts[identifier])
    {
      returnValue.push(this.callbacks[identifier](faker))
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

export default Factory
