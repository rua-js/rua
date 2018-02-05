import AnyData from 'rua-core/lib/Types/AnyData'

interface RuaCollectionInterface {
  /**
   * Returns the underlying array represented by the collection
   *
   * @returns {Object | Array}
   */
  all(): object | any[]

  /**
   * Return the average value of a given key
   *
   * @returns {Number}
   */
  avg(): number

  /**
   * Breaks the collection into multiple, smaller collections of a given size
   *
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
   * @param {String} key
   */
  contains(key: string): RuaCollectionInterface

  /**
   *
   *
   * @param {String} key
   * @returns {RuaCollectionInterface}
   */
  containsStrict(key: string): RuaCollectionInterface

  /**
   * Returns the total number of items in the collection
   *
   * @returns {Number}
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


}

export default RuaCollectionInterface
