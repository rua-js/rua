import * as _ from 'lodash'

import { Storage, StorageEngine } from '../../storage'
import { AnyData, AnyObject, ObjectOf } from '../../core/type/data'
import { CacheInterface } from '../interface/index'
import { CacheConfiguration } from '../type'

class Cache implements CacheInterface<Cache>
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
  protected store: AnyObject = {}

  /**
   * Other storage instance
   *
   * @type {object}
   */
  protected stores: ObjectOf<Cache> = {}

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

  public get length(): number
  {
    return this.list.length
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

  public get(key: string, defaultValue?: AnyData): AnyData
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

  public set(key: string, value: AnyData, time?: number): Promise<AnyData>
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

    return Promise.all([
      this.storage.set(this.getListKeyName(), this.list),
      this.storage.set(storageKeyName, value),
    ]).then(() => value)
  }

  public remove(key: string): Promise<AnyData>
  {
    const storageKeyName = this.getItemKeyName(key)
    const removedData = this.store[storageKeyName]
    // Cache removal
    _.unset(this.store, storageKeyName)
    _.pull(this.list, storageKeyName)

    return Promise.all([
      this.storage.set(
        this.getListKeyName(),
        this.list,
      ),
      this.storage.remove(storageKeyName),
    ]).then(() => removedData)
  }

  public clear(): Promise<AnyObject>
  {
    const removedData = this.all()
    const list = this.list
    // reset data in memory
    this.list = []
    this.store = {}

    // return removedData
    return Promise.all(
      [
        this.storage.remove(list),
        this.storage.remove(this.getListKeyName()),
      ],
    ).then(() => removedData)
  }

  public keys(): string[]
  {
    return this.list.map(key => key.replace(this.storeName, ''))
  }

  public all(): AnyObject
  {
    const output: AnyObject = {}

    for (const name in this.store)
    {
      if (Object.prototype.hasOwnProperty.call(this.store, name))
      {
        output[name.replace(this.storeName, '')] = this.store[name]
      }
    }

    return output
  }

  public merge(object: AnyObject): AnyObject
  {
    const returnValue = Object.assign(this.store, object)

    // todo:

    return returnValue
  }

  public async restore(): Promise<void>
  {
    // restore list key
    const listKey: string = this.getListKeyName()
    // restore list data
    this.list = await this.storage.get(listKey, [])
    // restore all saved cache data to store
    this.store = <AnyObject>await this.storage.get(this.list)
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
