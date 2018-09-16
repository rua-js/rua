import { CacheInterface } from './interface'
import { AnyObject, ArrayOf, ObjectOf } from '../rua/type/data'
import { Storage } from '../storage'
import { StorageLike } from './type'

export default class Cache implements CacheInterface
{
  public static storageEngine: StorageLike = Storage

  /**
   * Restoration status (true for restored)
   *
   * @type {boolean}
   */
  protected restorationStatus: boolean = false

  /**
   * Registered namespace
   *
   * @type {string[]}
   */
  protected namespaceList: ArrayOf<string> = []

  protected serializationList = []

  /**
   * Keys of data can be stored in Cache
   *
   * @type {string[]}
   */
  protected keyList: ArrayOf<string> = []

  /**
   * Keys of data will be persist in storage
   *
   * @type {string[]}
   */
  protected persistKeyList: ArrayOf<string> = []

  protected defaultValueTable: ObjectOf<any> = {}

  protected dataTable: ObjectOf<any> = {}

  protected expirationTable: ObjectOf<number> = {}

  protected ready: Promise<void>

  public constructor()
  {
    this.ready = this.restorePersistDataFromStorage()
  }

  /**
   * Get count of existing data in dataTable
   *
   * @returns {number}
   */
  get length(): number
  {
    return Object.keys(this.dataTable).length
  }

  public async get(key: string, defaultValue?: any): Promise<any>
  {
    const expirationTime = this.expirationTable[key]

    if (undefined !== expirationTime && expirationTime < +new Date())
    {
      // we remove data from local storage async
      this.remove(key)

      return undefined
    }

    return this.dataTable[key] || this.defaultValueTable[key] || defaultValue
  }

  public async set(key: string, value: any, time?: number): Promise<any>
  {
    const oldValue = this.dataTable[key]

    if (undefined !== time)
    {
      this.expirationTable[key] = time
    }

    if (oldValue === value)
    {
      return oldValue
    }

    const shouldPersist = this.persistKeyList.includes(key)

    if (shouldPersist)
    {
      try
      {
        await Cache.saveToStorage(key, value)
      } catch (e)
      {
        throw e
      }
    }

    this.dataTable[key] = value

    return this.dataTable[key]
  }

  public async has(key: string): Promise<boolean>
  {
    return !!this.get(key)
  }

  public async remove(key: string): Promise<any>
  {
    const oldData = this.dataTable[key]
    const shouldPersist = this.persistKeyList.includes(key)

    if (shouldPersist)
    {
      try
      {
        await Cache.removeFromStorage(key)
      } catch (e)
      {
        throw e
      }
    }

    delete this.dataTable[key]
    delete this.expirationTable[key]

    return oldData
  }

  public async clear(namespace?: string): Promise<AnyObject>
  {
    const oldData = this.all()

    await Cache.removeFromStorage(this.persistKeyList)

    this.dataTable = {}
    this.expirationTable = {}

    return oldData
  }

  public async keys(namespace?: string): Promise<ArrayOf<string>>
  {
    await this.flushExpiredData()

    return Object.keys(this.dataTable)
  }

  public async all(namespace?: string): Promise<ObjectOf<any>>
  {
    return { ...this.dataTable }
  }

  public async merge(object: AnyObject, namespace?: string): Promise<ObjectOf<any>>
  {
    this.dataTable = { ...this.dataTable, ...object }

    return this.all()
  }

  public appendPersistKey(...keys: string[])
  {
    this.persistKeyList.push(...keys)
  }

  protected async flushExpiredData(): Promise<void>
  {
    const currentTimestamp = +new Date()

    const expirationKeys = Object.keys(this.expirationTable)

    for (const key of expirationKeys)
    {
      if (this.expirationTable[key] < currentTimestamp)
      {
        await this.remove(key)
      }
    }
  }

  protected async restorePersistDataFromStorage(): Promise<void>
  {
    if (this.restorationStatus)
    {
      return console.warn('Cache is already restored')
    }

    const restoreKeyList = this.persistKeyList

    const restoreData: ObjectOf<string> = <ObjectOf<string>>await Cache.getFromStorage(restoreKeyList)

    // this.serializationList.forEach((key: string) =>
    // {
    //   restoreData[key] = Cache.deserialize(restoreData[key])
    // })

    this.dataTable = restoreData

    this.restorationStatus = true
  }

  protected static deserialize(value: string): any
  {
    return value
  }

  protected static serialize(value: any): string
  {
    return value
  }

  protected static async getFromStorage(key: string | string[]): Promise<any>
  {
    return Cache.storageEngine.get(key)
  }

  protected static async saveToStorage(key: string, value: any): Promise<void>
  {
    await Cache.storageEngine.set(key, value)
  }

  protected static async removeFromStorage(key: string | string[]): Promise<void>
  {
    await Cache.storageEngine.remove(key)
  }
}
