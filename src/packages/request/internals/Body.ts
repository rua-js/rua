import { AnyObject } from '../../core/type/data'
import { JSON2FormData } from '../../utility/convertor'
import { BodyInterface } from '../interfaces'

class Body implements BodyInterface
{
  protected body: AnyObject

  public constructor(body?: AnyObject)
  {
    this.body = body ? { ...body } : {}
  }

  public toFormData(): FormData
  {
    return JSON2FormData(this.body)
  }

  public set(key: string, value: any): void
  {
    this.body[key] = value
  }

  public get(key: string): any
  {
    return this.body[key]
  }

  public has(key: string): boolean
  {
    return !!this.body[key]
  }

  public toObject(): AnyObject
  {
    return this.body
  }
}

export default Body
