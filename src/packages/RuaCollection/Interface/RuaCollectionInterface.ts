import { AnyData, AnyObject, AnyArray } from 'rua-core/lib/Types'

interface RuaCollectionInterface {
  /**
   * Returns the underlying array/object represented by the collection
   *
   * @returns {Object | Array}
   */
  all(): AnyObject | AnyArray

  /**
   * Return the average value of a given key
   * If no key is given, it returns average of values
   *
   * @param {string | number} key
   * @returns {number}
   */
  avg(key?: string | number): number

  /**
   * Breaks the collection into multiple, smaller collections of a given size
   *
   * @forceCast Array
   * @returns {RuaCollectionInterface}
   */
  chunk(): RuaCollectionInterface

  /**
   * Collapses a collection of arrays into a single, flat collection
   *
   * @returns {RuaCollectionInterface}
   */
  collapse(): RuaCollectionInterface

  /**
   * Combines the keys of the collection with the values of another array or collection
   *
   * @returns {RuaCollectionInterface}
   */
  combine(): RuaCollectionInterface

  /**
   * Appends the given array or collection values onto the end of the collection
   *
   * @returns {RuaCollectionInterface}
   */
  concat(): RuaCollectionInterface

  /**
   * Determines whether the collection contains a given item
   *
   * @param {string} key
   */
  contains(key: string): RuaCollectionInterface

  /**
   *
   *
   * @param {string} key
   * @returns {RuaCollectionInterface}
   */
  containsStrict(key: string): RuaCollectionInterface

  /**
   * Returns the total number of items in the collection
   *
   * @returns {number}
   */
  count(): number

  /**
   *
   * @returns {RuaCollectionInterface}
   */
  crossJoin(): RuaCollectionInterface

  /**
   * Dumps the collection's items and ends execution of the script
   */
  dd(): void

  /**
   * Compares the collection against another collection or a array based on its values
   * This method will return the values in the original collection that are not present in the given collection
   *
   * @returns {RuaCollectionInterface}
   */
  diff(): RuaCollectionInterface

  /**
   * Compares the collection against another collection or a plain PHP  array based on its keys and values
   *
   * @alias diffObject
   * @deprecated
   * @returns {RuaCollectionInterface}
   */
  diffAssoc(): RuaCollectionInterface

  /**
   * Compares the collection against another collection or a plain PHP  array based on its keys and values
   *
   * @returns {RuaCollectionInterface}
   */
  diffObject(): RuaCollectionInterface

  /**
   *  compares the collection against another collection or a plain PHP  array based on its keys
   * @returns {RuaCollectionInterface}
   */
  diffKeys(): RuaCollectionInterface

  /**
   * Dumps the collection's items
   */
  dump(): void

  /**
   * Iterates over the items in the collection and passes each item to a callback
   *
   * @param {Function} callback
   */
  each(callback: Function): void

  /**
   * Iterates over the collection's items, passing each nested item value into the given callback
   *
   * @param {Function} callback
   */
  eachSpread(callback: Function): void

  /**
   * May be used to verify that all elements of a collection pass a given truth test
   *
   * @param {Function} callback
   * @returns {boolean}
   */
  every(callback: Function): boolean

  /**
   * Returns all items in the collection except for those with the specified keys
   *
   * @param {Function} callback
   * @returns {RuaCollectionInterface}
   */
  except(callback: Function): RuaCollectionInterface

  /**
   * Filters the collection using the given callback, keeping only those items that pass a given truth test
   *
   * @param {Function} callback
   * @returns {RuaCollectionInterface}
   */
  filter(callback: Function): RuaCollectionInterface

  /**
   * Filters the collection using the given callback, keeping only those items that pass a given truth test
   *
   * @param {Function} callback
   * @returns {AnyData}
   */
  first(callback?: Function): AnyData

  /**
   * Returns the first element in the collection with the given key / value pair
   *
   * @param {string} key
   * @param {AnyData} valueOrOperator
   * @param {AnyData} value
   * @returns {AnyData}
   */
  firstWhere(key: string, valueOrOperator: AnyData, value?: AnyData): AnyData

  /**
   * Iterates through the collection and passes each value to the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items. Then, the array is flattened by a level
   *
   * @param {Function} callback
   * @returns {RuaCollectionInterface}
   */
  flatMap(callback: Function): RuaCollectionInterface

  /**
   * Flattens a multi-dimensional collection into a single dimension
   *
   * @param {number} depth
   * @returns {RuaCollectionInterface}
   */
  flatten(depth?: number): RuaCollectionInterface

  /**
   * Swaps the collection's keys with their corresponding values
   *
   * @returns {RuaCollectionInterface}
   */
  flip(): RuaCollectionInterface

  /**
   * Removes an item from the collection by its key
   * NOTE: this api mutates the original collection
   *
   * @returns {RuaCollectionInterface}
   */
  forget(): RuaCollectionInterface

  /**
   * Returns a new collection containing the items that would be present on a given page number
   *
   * @param {number} page
   * @param {number} itemPerPage
   * @returns {RuaCollectionInterface}
   */
  forPage(page: number, itemPerPage: number): RuaCollectionInterface

  /**
   * Returns the item at a given key. If the key does not exist, null is returned
   *
   * @param {string | number} key
   * @param {AnyData | Function}defaultValue
   * @returns {AnyData}
   */
  get(key: string | number, defaultValue?: AnyData | Function): AnyData

  /**
   * Groups the collection's items by a given key
   * todo: read laravel documentation to get correct function
   *
   * @param {string | number | Function} key
   * @returns {RuaCollectionInterface}
   */
  groupBy(key: string | number | Function): RuaCollectionInterface

  /**
   * Determines if a given key exists in the collection
   *
   * @param {string | number} key
   * @returns {RuaCollectionInterface}
   */
  has(key: string | number): RuaCollectionInterface

  /**
   * Joins the items in a collection. Its arguments depend on the type of items in the collection
   * If the collection contains arrays or objects, you should pass the key of the attributes you wish to join, and the "glue" string you wish to place between the values
   *
   * @param {string | number} glueOrKey
   * @param {string | number} glue
   * @returns {RuaCollectionInterface}
   */
  implode(glueOrKey: string | number, glue?: string | number): RuaCollectionInterface

  /**
   * Removes any values from the original collection that are not present in the given array/object or collection
   *
   * @param {AnyObject} comparison
   * @returns {RuaCollectionInterface}
   */
  intersect(comparison: AnyObject | AnyArray | RuaCollectionInterface): RuaCollectionInterface

  /**
   * Removes any keys from the original collection that are not present in the given array/object or collection
   *
   * @param {AnyObject | AnyArray | RuaCollectionInterface} comparison
   * @returns {RuaCollectionInterface}
   */
  intersectByKeys(comparison: AnyObject | AnyArray | RuaCollectionInterface): RuaCollectionInterface

  /**
   * Returns true if the collection is empty; otherwise, false is returned
   *
   * @returns {boolean}
   */
  isEmpty(): boolean

  /**
   * Returns true if the collection is not empty; otherwise, false is returned
   *
   * @returns {boolean}
   */
  isNotEmpty(): boolean

  /**
   * Keys the collection by the given key. If multiple items have the same key, only the last one will appear in the new collection
   *
   * @param {number | string} key
   * @returns {RuaCollectionInterface}
   */
  keyBy(key: number | string): RuaCollectionInterface
}

export default RuaCollectionInterface
