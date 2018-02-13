import Cache from '../Cache'

import { AnyData, AnyObject } from 'rua-core/lib/Types'

interface CacheInterface {
  get(key: string, defaultValue?: any): AnyData
  set(key: string, value: string, time?: number): AnyData
  remove(key: string): AnyData
  clear(): AnyObject
  length(): number
  keys(): string[]
  all(): AnyData
  restore(): Promise<void>
}

export default CacheInterface
