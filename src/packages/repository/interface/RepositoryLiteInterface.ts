import { AnyData, AnyObject, AnyArray }from '../../type/data'

interface RepositoryLiteInterface
{
  readonly length: number

  set(key: string, data: AnyData): AnyData

  get(key: string, defaultValue?: AnyData): AnyData

  remove(key: string): AnyData

  all(): AnyObject

  clear(): AnyObject

  keys(): string[]

  values(): AnyArray
}

export default RepositoryLiteInterface
