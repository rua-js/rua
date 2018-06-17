import { default as CacheEngine } from './engine/Cache'
import { CacheInterface } from './interface'

const Cache: CacheInterface = new CacheEngine()

export default Cache
