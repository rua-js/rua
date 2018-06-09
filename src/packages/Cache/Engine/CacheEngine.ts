import { AnyData, AnyObject } from 'rua-core/lib/Types'
import * as _ from 'lodash'

import { Storage, StorageEngine } from '../../Storage'
import { CacheEngineInterface } from '../Interface/index'

class CacheEngine implements CacheEngineInterface
{

  /**
   * Cache prefix
   *
   * @type {string}
   */
  protected prefix: string

  protected configs: any

  /**
   * Storage instance
   *
   * @type {Storage}
   */
  protected storage: StorageEngine = Storage

  protected store: any = {}

  /**
   * Other storage instance
   *
   * @type {object}
   */
  protected stores: any = {}

  /**
   * Cached data count
   *
   * @type {number}
   */
  protected count: number = -1

  /**
   * Cached data keys
   *
   * @type {string[]}
   */
  protected list: string[] = []

  /**
   * Constructor
   * Initialize instance with prefix
   *
   * @param {object} configs
   */
  constructor(configs = {})
  {
    const {
      prefix = 'cache-'
    } = configs

    this.prefix = prefix
    this.configs = configs
  }


  /**
   * Use a different storage which will be create if NOT exists
   *
   * @param {string} storeName
   * @returns {CacheEngine}
   */
  public useStore(storeName: string): CacheEngine
  {
    const store = this.stores[storeName]

    if (store)
    {
      return store
    }

    this.stores[storeName] = new CacheEngine({ ...this.configs, storeName })

    return this.stores[storeName]
  }

  public get(key: string, defaultValue?: any): AnyData
  {
    const storageKeyName = this.getItemKeyName(key)
    // defaultValue will be returned if no data with the specific key
    if (!this.list.includes(storageKeyName))
    {
      return defaultValue
    }
    // retrieve data from cache with deserialization
    return this.store[storageKeyName]
  }

  public set(key: string, value: string, time?: number): AnyData
  {
    const storageKeyName: string = this.getItemKeyName(key)
    // add to list if it is NOT in the list
    if (!this.list.includes(storageKeyName))
    {
      this.list.push(storageKeyName)
    }
    // save to cache
    this.store[storageKeyName] = value
    // save to storage
    this.storage.set(this.getListKeyName(), this.list)
    this.storage.set(storageKeyName, value)

    return value
  }

  public remove(key: string): AnyData
  {
    const storageKeyName = this.getItemKeyName(key)
    const removedData = this.store[storageKeyName]
    // CacheEngine removal
    _.unset(this.store, storageKeyName)
    _.pull(this.list, storageKeyName)

    // Sync list
    this.storage.set(
      this.getListKeyName(),
      this.list,
    )
    // Sync item
    this.storage.remove(storageKeyName)

    return removedData
  }

  public clear(): AnyObject
  {
    const removedData = this.all()
    // remove all data from storage
    this.storage.remove(this.list)
    // remove list from storage
    this.storage.remove(this.getListKeyName())
    // reset data in memory
    this.count = 0
    this.list = []
    this.store = {}

    return removedData
  }

  public length(): number
  {
    return this.list.length
  }

  public keys(): string[]
  {
    return this.list.map(key => key.replace(this.prefix, ''))
  }

  public all(): any
  {
    const output: any = {}
    for (const name in this.store)
    {
      output[name.replace(this.prefix, '')] = this.store[name]
    }
    return output
  }

  public async restore(): Promise<void>
  {
    // Get list key
    const listKey: string = <string>this.getListKeyName()
    // Get list data
    const list: string = <string>await storage.get(listKey, [])
    // Parse list data
    this.list = <string[]>JSON.parse(list)
    // Load all saved cache data to store
    this.store = <AnyObject>await storage.get(this.list)
    // Calculate count
    this.count = this.list.length
  }

  /**
   *
   * @returns {string}
   */
  protected getListKeyName(): string
  {
    return `${this.prefix}list`
  }

  protected getItemKeyName(key: string): string
  {
    return `${this.prefix}${key}`
  }

}

export default CacheEngine
