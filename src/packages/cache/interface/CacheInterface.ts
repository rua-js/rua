import Cache from '../engine/Cache'
import { AnyData, AnyObject } from 'rua-core/lib/Types'

interface CacheInterface
{
  length: number

  useStore(storeName: string): CacheInterface

  get(key: string, defaultValue?: any): AnyData

  set(key: string, value: AnyData, time?: number): AnyData

  remove(key: string): AnyData

  clear(): AnyObject

  keys(): string[]

  all(): AnyData

  restore(): Promise<void>
}

export default CacheInterface
