// Third-party Dependency
import * as localForage from 'localforage'
import * as _ from 'lodash'
// Self Dependency
import { StorageEngineInterface } from '../Interface'
// Rua Core Dependency
import { AnyData, AnyObject } from 'rua-core/lib/Types'

class StorageEngine implements StorageEngineInterface
{

  constructor()
  {
    localForage.config()
  }

  /**
   * Set or Replace a item with new data.
   *
   * @param {string | string[]} key
   * @param {AnyData | AnyData[]} value
   * @param {number} time
   * @returns {Promise<void>}
   */
  public async set<T>(key: string | string[], value: AnyData | AnyData[]): Promise<void>
  {
    if (_.isArray(key))
    {
      const keys: string[] = key
      for (const index in keys)
      {
        // @ts-ignore
        await localForage.setItem(keys[index], value[index])
      }

      return
    }
    // @ts-ignore: string
    await localForage.setItem(key, value)

    return
  }

  /**
   * Gets the item with the given key.
   *
   * @param {string | string[]} key
   * @param {AnyData | AnyData[]} defaultValue
   * @returns {Promise<void>}
   */
  public async get<T>(key: string | string[], defaultValue?: any): Promise<AnyData>
  {
    if (_.isArray(key))
    {
      const keys: string[] = <string[]>key
      const output: any = {}
      for (const index in keys)
      {
        output[keys[index]] = await localForage.getItem(keys[index])
      }

      return output
    }
    // @ts-ignore
    const value = await localForage.getItem(key)

    // @ts-ignore
    return value || defaultValue
  }

  /**
   * Removes the item with the given key.
   *
   * @param {string | string[]} key
   * @returns {Promise<void>}
   */
  public async remove(key: string | string[]): Promise<void>
  {
    if (_.isArray(key))
    {
      const keys: string[] = <string[]>key
      for (const index in keys)
      {
        await localForage.removeItem(keys[index])
      }

      return
    }

    // @ts-ignore: string
    return localForage.removeItem(key)
  }

  /**
   * Remove all items.
   *
   * @returns {Promise<void>}
   */
  public async clear(): Promise<void>
  {
    return localForage.clear()
  }

  /**
   * Gets the count of all items.
   *
   * @returns {Promise<number>}
   */
  public async length(): Promise<number>
  {
    return localForage.length()
  }

  /**
   * Gets keys of all items as Array.
   *
   * @returns {Promise<string[]>}
   */
  public async keys(): Promise<string[]>
  {
    return localForage.keys()
  }

  /**
   * Gets all items as Object.
   *
   * @returns {Promise<AnyObject>}
   */
  public async all(): Promise<AnyObject>
  {
    const data = {}
    const keys = await this.keys()
    for (const key of keys)
    {
      // @ts-ignore: index on object
      data[key] = await this.get(key)
    }

    return data
  }
}

export default StorageEngine