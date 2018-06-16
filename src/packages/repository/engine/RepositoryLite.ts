import { AnyObject, AnyData } from '../../type/data'
import { RepositoryLiteInterface } from '../interface'

class RepositoryLite implements RepositoryLiteInterface
{
  protected memory: AnyObject = {}

  public get length(): number
  {
    return Object.keys(this.memory).length
  }

  public set(key: string | string[], data: AnyData): AnyData
  {
    if (Array.isArray(key))
    {
      return this.multiSet(key, Array.from(data || []))
    }

    return this.memory[key] = data
  }

  public get(key: string | string[], defaultValue?: AnyData): AnyData
  {
    if (Array.isArray(key))
    {
      return this.multiGet(key, Array.from(defaultValue || []))
    }

    return this.memory[key] || defaultValue
  }

  public remove(key: string | string[]): AnyData
  {
    if (Array.isArray(key))
    {
      return this.multiRemove(key)
    }

    const data = this.memory[key]
    delete this.memory[key]

    return data
  }

  public clear(): AnyObject
  {
    const data = this.memory
    this.memory = {}

    return data
  }

  public keys(): string[]
  {
    return Object.keys(this.memory)
  }

  public values(): any[]
  {
    return Object.values(this.memory)
  }

  public all(): AnyObject
  {
    return this.memory
  }

  protected multiRemove(key: string[]): AnyData[]
  {
    return key.map(k => this.remove(k))
  }

  protected multiGet(key: string[], defaultValue: AnyData[])
  {
    return key.map((k, i) => this.get(k, defaultValue[i]))
  }

  protected multiSet(key: string[], data: AnyData[]): AnyData[]
  {
    return key.map((k, i) => this.set(k, data[i]))
  }
}

export default RepositoryLite
