import { AnyData, AnyObject, AnyArray } from 'rua-core/lib/Types'

interface CollectionInterface<T> {
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
   * @param {number} size
   * @returns {T}
   */
  chunk(size: number): T

  /**
   * Collapses a collection of arrays into a single, flat collection
   *
   * @returns {T}
   */
  collapse(): T

  /**
   * Combines the keys of the collection with the values of another array or collection
   *
   * @param {T | AnyArray | AnyObject} values
   * @returns {T}
   */
  combine(values: T | AnyArray | AnyObject): T

  /**
   * Appends the given array or collection values onto the end of the collection
   *
   * @param {T | AnyArray | AnyObject} concat
   * @returns {T}
   */
  concat(concat: T | AnyArray | AnyObject): T

  /**
   * Determines whether the collection contains a given item
   *
   * @param {string} key
   */
  contains(key: string): T

  /**
   *
   *
   * @param {string} key
   * @returns {T}
   */
  containsStrict(key: string): T

  /**
   * Returns the total number of items in the collection
   *
   * @returns {number}
   */
  count(): number

  /**
   *
   * @returns {T}
   */
  crossJoin(): T

  /**
   * Dumps the collection's items and ends execution of the script
   */
  dd(): void

  /**
   * Compares the collection against another collection or a array based on its values
   * This method will return the values in the original collection that are not present in the given collection
   *
   * @returns {T}
   */
  diff(): T

  /**
   * Compares the collection against another collection or a plain PHP  array based on its keys and values
   *
   * @alias diffObject
   * @deprecated
   * @returns {T}
   */
  diffAssoc(): T

  /**
   * Compares the collection against another collection or a plain PHP  array based on its keys and values
   *
   * @returns {T}
   */
  diffObject(): T

  /**
   *  compares the collection against another collection or a plain PHP  array based on its keys
   * @returns {T}
   */
  diffKeys(): T

  /**
   * Dumps the collection's items
   */
  dump(): void

  /**
   * Iterates over the items in the collection and passes each item to a callbacks
   *
   * @param {Function} callback
   */
  each(callback: Function): void

  /**
   * Iterates over the collection's items, passing each nested item value into the given callbacks
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
   * @returns {T}
   */
  except(callback: Function): T

  /**
   * Filters the collection using the given callbacks, keeping only those items that pass a given truth test
   *
   * @param {Function} callback
   * @returns {T}
   */
  filter(callback: Function): T

  /**
   * Filters the collection using the given callbacks, keeping only those items that pass a given truth test
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
   * Iterates through the collection and passes each value to the given callbacks. The callbacks is free to modify the item and return it, thus forming a new collection of modified items. Then, the array is flattened by a level
   *
   * @param {Function} callback
   * @returns {T}
   */
  flatMap(callback: Function): T

  /**
   * Flattens a multi-dimensional collection into a single dimension
   *
   * @param {number} depth
   * @returns {T}
   */
  flatten(depth?: number): T

  /**
   * Swaps the collection's keys with their corresponding values
   *
   * @returns {T}
   */
  flip(): T

  /**
   * Removes an item from the collection by its key
   * NOTE: this api mutates the original collection
   *
   * @returns {T}
   */
  forget(): T

  /**
   * Returns a new collection containing the items that would be present on a given page number
   *
   * @param {number} page
   * @param {number} itemPerPage
   * @returns {T}
   */
  forPage(page: number, itemPerPage: number): T

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
   * @returns {T}
   */
  groupBy(key: string | number | Function): T

  /**
   * Determines if a given key exists in the collection
   *
   * @param {string | number} key
   * @returns {T}
   */
  has(key: string | number): T

  /**
   * Joins the items in a collection. Its arguments depend on the type of items in the collection
   * If the collection contains arrays or objects, you should pass the key of the attributes you wish to join, and the "glue" string you wish to place between the values
   *
   * @param {string | number} glueOrKey
   * @param {string | number} glue
   * @returns {T}
   */
  implode(glueOrKey: string | number, glue?: string | number): T

  /**
   * Removes any values from the original collection that are not present in the given array/object or collection
   *
   * @param {AnyObject} comparison
   * @returns {T}
   */
  intersect(comparison: AnyObject | AnyArray | T): T

  /**
   * Removes any keys from the original collection that are not present in the given array/object or collection
   *
   * @param {AnyObject | AnyArray | T} comparison
   * @returns {T}
   */
  intersectByKeys(comparison: AnyObject | AnyArray | T): T

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
   * @returns {T}
   */
  keyBy(key: number | string): T
}

export default CollectionInterface
