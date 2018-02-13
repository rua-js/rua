import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'
import { AnyObject, AnyArray } from 'rua-core/lib/Types'
import * as _ from 'lodash'

import { RuaCollectionInterface } from './Interface'

/**
 * @class provides a fluent, convenient wrapper for working with arrays of data
 */
class RuaCollection extends AbstractRuaPackage implements RuaCollectionInterface<RuaCollection> {

  /**
   * @constructor
   * @param {AnyObject | AnyArray | RuaCollection} data
   */
  public constructor(data: AnyObject | AnyArray | RuaCollection) {
    super()
    // deep clone
    this.store = _.cloneDeep(data)
  }

  /**
   * Returns the underlying array/object represented by the collection
   *
   * @returns {AnyObject | AnyArray}
   */
  public all(): AnyObject | AnyArray {
    return _.cloneDeep(this.store)
  }

  /**
   * Return the average value of a given key
   * If no key is given, it returns average of values
   *
   * @param {string | number} key
   * @returns {number}
   */
  public avg(key?: string | number): number {
    // total item count
    const count = _.size(this.store)
    // if NONE key is given
    if (_.isNil(key)) {
      const total = _.reduce(this.store, (carry: number, value: number) => {
        // Force number
        return carry + _.toNumber(value)
      }, 0)

      return total / count
    }

    // if key is given
    const total = _.reduce(this.store, (carry: number, value: AnyObject | AnyArray) => {
      // @ts-ignore: index
      return carry + _.toNumber(value[key!])
    }, 0)

    return total / count
  }

  /**
   * Breaks the collection into multiple, smaller collections of a given size
   *
   * @param {number} size
   * @returns {RuaCollection}
   */
  public chunk(size: number): RuaCollection {
    // assign
    const data: AnyArray | AnyObject = this.store

    // if data is array
    if (_.isArray(data)) {
      return this.create(_.chunk(<AnyArray>data, size))
    }

    // if data is object
    const out: AnyArray[] = []
    let counter: number = 0
    let chunkData: any = {}

    for (const key in data) {
      if (counter < size) {
        chunkData[key] = data[key]
        counter += 1
        continue
      }
      // prepare next chunk
      out.push(chunkData)
      chunkData = {
        [key]: data[key]
      }
      counter = 1
    }

    if (!_.isEmpty(chunkData)) {
      out.push(chunkData)
    }

    return this.create(out)
  }

  /**
   * Collapses a collection of arrays into a single, flat collection
   *
   * @returns {RuaCollection}
   */
  public collapse(): RuaCollection {
    // assign
    const data = this.store
    const isArray = _.isArray(data[_.keys(data)[0]])
    let out: AnyArray | AnyObject = isArray ? [] : {}
    // if result should be array
    if (isArray) {
      _.each(data, (item) => {
        _.each(item, (value) => {
          (out as AnyArray).push(value)
        })
      })
      return this.create(out)
    }
    // if result should be object
    _.each(data, (item) => {
      out = { ...out, ...item }
    })
    return this.create(out)
  }

  /**
   * Combines the keys of the collection with the values of another array or collection
   *
   * @param {RuaCollection | AnyArray | AnyObject} collection
   * @returns {RuaCollection}
   */
  combine(collection: RuaCollection | AnyArray | AnyObject): RuaCollection {
    const data = this.store

    const _collection: AnyArray | AnyObject = this.parseCollection(collection)

    // if base data or given data is
    if (_.isArray(data) || _.isArray(_collection)) {
      return this.create((data as AnyArray).concat(_collection))
    }

    const keys: AnyArray = _.values(data)
    let _values: AnyArray
      _values = _.values((values as RuaCollection).all())
      _values = _.values(values)
    const out: AnyObject = _.zipObject(keys, _values)
    return this.create(out)
  }

  /**
   * Appends the given array or collection values onto the end of the collection
   *
   * @param {RuaCollection | AnyArray | AnyObject} concat
   * @returns {RuaCollection}
   */
  concat(concat: RuaCollection | AnyArray | AnyObject): RuaCollection {

  }

  /**
   * Creates a new instance of current class, and it's extendable
   *
   * @protected
   * @param {AnyObject | AnyArray | RuaCollection} data
   */
  protected create(data: AnyObject | AnyArray | RuaCollection) {
    return new (<any>this.constructor)(data)
  }

  /**
   * parse data
   *
   * @param {RuaCollection | AnyArray | AnyObject} collection
   * @returns {AnyArray | AnyObject}
   */
  protected parseCollection(collection: RuaCollection | AnyArray | AnyObject): AnyObject | AnyArray {
    if (collection instanceof RuaCollection) {
      return (collection as RuaCollection).all()
    }
    return collection
  }
}

export default RuaCollection
