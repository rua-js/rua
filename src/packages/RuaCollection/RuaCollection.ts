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

    // if data is object, todo: optimization
    const output: AnyArray[] = []
    let counter: number = 0
    let chunkData: any = {}
    for (const key in data) {
      if (counter < size) {
        chunkData[key] = data[key]
        counter += 1
        continue
      }
      // prepare next chunk
      output.push(chunkData)
      chunkData = {
        [key]: data[key]
      }
      counter = 1
    }
    if (_.size(chunkData)) {
      output.push(chunkData)
    }

    return this.create(output)
  }

  /**
   * Collapses a collection of arrays into a single, flat collection
   *
   * @returns {T}
   */
  public collapse(): RuaCollection {

    return this.create({})
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
}

export default RuaCollection
