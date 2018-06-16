import { AnyData, AnyObject, AnyArray }from '../../type/data'

interface RepositoryLiteInterface
{
  readonly length: number

  set(key: string | string[], data: AnyData | AnyData[]): AnyData | AnyData[]

  get(key: string | string[], defaultValue?: AnyData | AnyData[]): AnyData | AnyData[]

  remove(key: string | string[]): AnyData | AnyData[]

  all(): AnyObject

  clear(): AnyObject

  keys(): string[]

  values(): AnyArray
}

export default RepositoryLiteInterface
