import CacheEngine from '../Engine/CacheEngine'
import { AnyData, AnyObject } from 'rua-core/lib/Types'

interface CacheEngineInterface {
  store(storeName: string): CacheEngine
  get(key: string, defaultValue?: any): AnyData
  set(key: string, value: string, time?: number): AnyData
  remove(key: string): AnyData
  clear(): AnyObject
  length(): number
  keys(): string[]
  all(): AnyData
  restore(): Promise<void>
}

export default CacheEngineInterface
