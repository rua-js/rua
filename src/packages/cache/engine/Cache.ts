import { AnyData, AnyObject } from 'rua-core/lib/Types'
import * as _ from 'lodash'

import { Storage, StorageEngine } from '../../storage'
import { CacheConfiguration } from '../type'
import { CacheInterface } from '../interface/index'

class Cache implements CacheInterface
{

  /**
   * cache store name
   *
   * @type {string}
   */
  protected storeName: string

  /**
   * Saved configuration
   *
   * @type {CacheConfiguration}
   */
  protected configs: CacheConfiguration

  /**
   * storage instance
   *
   * @type {Storage}
   */
  protected storage: StorageEngine = Storage

  /**
   * Store that saves all other Cache instances
   *
   * @type {{}}
   */
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
   * Constructor that initialize instance with configuration
   *
   * @param {object} configs
   */
  public constructor(configs: CacheConfiguration = {})
  {
    const {
      storeName = 'cache-',
    } = configs

    this.storeName = storeName
    this.configs = configs
  }

  /**
   * Use a different storage which will be create if NOT exists
   *
   * @param {string} storeName
   * @returns {Cache}
   */
  public useStore(storeName: string): Cache
  {
    const store = this.stores[storeName]

    if (store)
    {
      return store
    }

    this.stores[storeName] = new Cache({ ...this.configs, storeName })

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
    // Cache removal
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
    return this.list.map(key => key.replace(this.storeName, ''))
  }

  public all(): any
  {
    const output: any = {}
    for (const name in this.store)
    {
      if (Object.prototype.hasOwnProperty.call(this.store, name))
      {
        output[name.replace(this.storeName, '')] = this.store[name]
      }
    }

    return output
  }

  public async restore(): Promise<void>
  {
    // Get list key
    const listKey: string = <string>this.getListKeyName()
    // Get list data
    const list: string = <string>await this.storage.get(listKey, [])
    // Parse list data
    this.list = <string[]>JSON.parse(list)
    // Load all saved cache data to store
    this.store = <AnyObject>await this.storage.get(this.list)
    // Calculate count
    this.count = this.list.length
  }

  /**
   *
   * @returns {string}
   */
  protected getListKeyName(): string
  {
    return `${this.storeName}list`
  }

  protected getItemKeyName(key: string): string
  {
    return `${this.storeName}${key}`
  }

}

export default Cache
