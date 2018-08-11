import { AnyData, AnyObject } from '../../core/type/data'
import { RepositoryLiteInterface } from '../interface'

class RepositoryLite implements RepositoryLiteInterface
{
  protected data: AnyObject = {}

  public get length(): number
  {
    return Object.keys(this.data).length
  }

  public load(data: AnyObject): AnyObject
  {
    return this.data = { ...data }
  }

  public merge(data: AnyObject): AnyObject
  {
    return this.data = { ...this.data, ...data }
  }

  public set(key: string, data: AnyData): AnyData
  {
    return this.data[key] = data
  }

  public get(key: string, defaultValue?: AnyData): AnyData
  {
    return this.data[key] || defaultValue
  }

  public has(key: string): boolean
  {
    return !!this.data[key]
  }

  public remove(key: string): AnyData
  {
    const data = this.data[key]
    delete this.data[key]

    return data
  }

  public clear(): AnyObject
  {
    const data = this.data
    this.data = {}

    return data
  }

  public keys(): string[]
  {
    return Object.keys(this.data)
  }

  public values(): any[]
  {
    return Object.values(this.data)
  }

  public all(): AnyObject
  {
    return this.data
  }
}

export default RepositoryLite
