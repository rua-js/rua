import { AnyArray, AnyData, Nilable } from '../../rua/type/data'
import { Interpolator } from '../../rua/type/function'

interface RepositoryInterface
{
  readonly length: number

  set(key: string | string[], data: AnyData, interpolator?: Interpolator): AnyData

  get(key: string | string[], defaultValue?: AnyData, interpolator?: Interpolator): AnyData

  remove(key: string | string[], interpolator?: Interpolator): AnyData

  clear(interpolator: Interpolator): Nilable<Object>

  keys(interpolator: Interpolator): string[]

  values(interpolator: Interpolator): AnyArray
}

export default RepositoryInterface
