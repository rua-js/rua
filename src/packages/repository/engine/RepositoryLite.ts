import { AnyObject, AnyData } from '../../type/data'
import { RepositoryLiteInterface } from '../interface'

class RepositoryLite implements RepositoryLiteInterface
{
  protected memory: AnyObject = {}

  public get length(): number
  {
    return Object.keys(this.memory).length
  }

  public set(key: string, data: AnyData): AnyData
  {
    return this.memory[key] = data
  }

  public get(key: string, defaultValue?: AnyData): AnyData
  {
    return this.memory[key] || defaultValue
  }

  public remove(key: string): AnyData
  {
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
}

export default RepositoryLite
