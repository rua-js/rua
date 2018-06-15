import { AnyData } from '../../Type/Data'
import { Repository } from '../engine'

interface RepositoryHooks
{
  beforeSet(key: string, data: AnyData, instance: Repository): boolean

  afterSet(key: string, data: AnyData): boolean

  beforeGet(key: string, defaultValue: AnyData, instance: Repository): boolean

  afterGet(key: string, defaultValue: AnyData, instance: Repository): boolean

  beforeRemove(key: string, instance: Repository): boolean

  afterRemove(key: string, instance: Repository): boolean

  beforeClear(instance: Repository): boolean
  afterClear(instance: Repository): boolean

  beforeKeys(instance: Repository): boolean

  beforeValues(instance: Repository): boolean
}

export default RepositoryHooks
