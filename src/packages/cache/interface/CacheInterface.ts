import Cache from '../engine/Cache'
import { AnyData, AnyObject } from 'rua-core/lib/Types'

interface CacheInterface<T>
{
  length: number

  useStore(storeName: string): T

  get(key: string, defaultValue?: any): AnyData

  set(key: string, value: AnyData, time?: number): AnyData

  remove(key: string): AnyData

  clear(): AnyObject

  keys(): string[]

  all(): AnyData

  merge(object: AnyObject): AnyObject

  restore(): Promise<void>
}

export default CacheInterface
