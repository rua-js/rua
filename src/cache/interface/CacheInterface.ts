import { AnyObject, ArrayOf, ObjectOf } from '../../rua/type/data'

export default interface CacheInterface
{
  length: number

  get(key: string, defaultValue?: any): Promise<any>

  set(key: string, value: any, time?: number): Promise<any>

  has(key: string): Promise<boolean>

  remove(key: string): Promise<any>

  clear(namespace?: string): Promise<AnyObject>

  keys(namespace?: string): Promise<ArrayOf<string>>

  all(namespace?: string): Promise<ObjectOf<any>>

  merge(object: AnyObject, namespace?: string): Promise<ObjectOf<any>>

  // restore(): Promise<void>
}
