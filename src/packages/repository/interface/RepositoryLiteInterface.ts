import { AnyArray, AnyData, AnyObject } from '../../core/type/data'

interface RepositoryLiteInterface
{
  readonly length: number

  load(data: AnyObject): AnyObject

  merge(data: AnyObject): AnyObject

  set(key: string, data: AnyData): AnyData

  get(key: string, defaultValue?: AnyData): AnyData

  has(key: string): boolean

  remove(key: string): AnyData

  all(): AnyObject

  clear(): AnyObject

  keys(): string[]

  values(): AnyArray
}

export default RepositoryLiteInterface
