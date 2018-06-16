import { AnyArray, AnyData, NilableObject } from '../../type/data'
import { Interpolator } from '../../type/function'

interface RepositoryInterface
{
  readonly length: number

  set(key: string | string[], data: AnyData, interpolator?: Interpolator): AnyData

  get(key: string | string[], defaultValue?: AnyData, interpolator?: Interpolator): AnyData

  remove(key: string | string[], interpolator?: Interpolator): AnyData

  clear(interpolator: Interpolator): NilableObject

  keys(interpolator: Interpolator): string[]

  values(interpolator: Interpolator): AnyArray
}

export default RepositoryInterface
