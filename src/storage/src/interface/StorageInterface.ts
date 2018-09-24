// rua Core Dependency
import { AnyObject, AnyData } from '../../../rua/type/data'

interface StorageInterface
{

  /**
   * Gets the count of all items.
   *
   * @returns {Promise<number>}
   */
  length: Promise<number>

  /**
   * Set or Replace a item with new data.
   *
   * @param {string | string[]} key
   * @param {AnyData | AnyData[]} value
   * @returns {Promise<void>}
   */
  set(key: string | string[], value: AnyData | AnyData[]): Promise<void>

  /**
   * Gets the item with the given key.
   *
   * @param {string | string[]} key
   * @param {AnyData | AnyData[]} defaultValue
   * @returns {Promise<void>}
   */
  get(key: string | string[], defaultValue?: AnyData | AnyData[]): Promise<AnyData>

  /**
   * Removes the item with the given key.
   *
   * @param {string | string[]} key
   * @returns {Promise<void>}
   */
  remove(key: string | string[]): Promise<void>

  /**
   * Remove all items.
   *
   * @returns {Promise<void>}
   */
  clear(): Promise<void>

  /**
   * Gets keys of all items as Array.
   *
   * @returns {Promise<string[]>}
   */
  keys(): Promise<string[]>

  /**
   * Gets values of all items as Array.
   *
   * @returns {Promise<string[]>}
   */
  values(): Promise<AnyData[]>

  /**
   * Gets all items as Object.
   *
   * @returns {Promise<AnyObject>}
   */
  all(): Promise<AnyObject>
}

export default StorageInterface
