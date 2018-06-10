import { AnyArray, AnyData, AnyObject } from '../../Type/Data'

interface MemoryEngineInterface
{
  set(key: string, data: AnyData): AnyData

  get(key: string, defaultValue?: AnyData): AnyData

  remove(key: string): AnyData

  clear(): AnyObject

  length(): number

  keys(): string[]

  values(): AnyArray

  all(): AnyObject
}

export default MemoryEngineInterface
