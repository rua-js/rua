import { AnyObject, AnyData } from '../../rua/type/data'
import { Repository } from '../engine'
import { Interpolator } from '../../rua/type/function'

interface RepositoryHooks
{
  beforeSet?(
    instance: Repository,
    key: string,
    data: AnyData,
    interpolator?: Interpolator,
  ): void

  afterSet?(
    instance: Repository,
    key: string,
    data: AnyData,
    interpolator?: Interpolator,
    returnData?: AnyData,
  ): void

  beforeMultiSet?(
    instance: Repository,
    key: string[],
    data: AnyData[],
    interpolator?: Interpolator,
  ): void

  afterMultiSet?(
    instance: Repository,
    key: string[],
    data: AnyData[],
    interpolator?: Interpolator,
    returnData?: AnyData,
  ): void

  beforeGet?(
    instance: Repository,
    key: string | undefined,
    defaultValue: AnyData,
    interpolator?: Interpolator,
  ): void

  afterGet?(
    instance: Repository,
    key: string,
    defaultValue: AnyData,
    interpolator?: Interpolator,
    returnData?: AnyData,
  ): void

  beforeMultiGet?(
    instance: Repository,
    key: string[],
    defaultValue: AnyData[],
    interpolator?: Interpolator,
  ): void

  afterMultiGet?(
    instance: Repository,
    key: string[],
    defaultValue: AnyData[],
    interpolator?: Interpolator,
    returnData?: AnyData,
  ): void

  beforeRemove?(
    instance: Repository,
    key: string,
    interpolator?: Interpolator,
  ): void

  afterRemove?(
    instance: Repository,
    key: string,
    interpolator?: Interpolator,
    returnData?: AnyData,
  ): void

  beforeMultiRemove?(
    instance: Repository,
    key: string[],
    interpolator?: Interpolator,
  ): void

  afterMultiRemove?(
    instance: Repository,
    key: string[],
    interpolator?: Interpolator,
    returnData?: AnyData,
  ): void

  beforeClear?(
    instance: Repository,
    interpolator?: Interpolator,
  ): void

  afterClear?(
    instance: Repository,
    interpolator?: Interpolator,
    returnData?: AnyObject,
  ): void

  beforeKeys?(
    instance: Repository,
    interpolator?: Interpolator,
  ): void

  afterKeys?(
    instance: Repository,
    interpolator?: Interpolator,
    returnData?: string[],
  ): void

  beforeValues?(
    instance: Repository,
    interpolator?: Interpolator,
  ): void

  afterValues?(
    instance: Repository,
    interpolator?: Interpolator,
    returnData?: AnyData[],
  ): void

  beforeAll?(
    instance: Repository,
    interpolator?: Interpolator,
  ): AnyObject

  afterAll?(
    instance: Repository,
    interpolator?: Interpolator,
    returnData?: AnyData,
  ): AnyData
}

export default RepositoryHooks
