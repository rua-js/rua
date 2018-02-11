import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'
import { AnyObject, AnyArray } from 'rua-core/lib/Types'
import * as _ from 'lodash'

import { RuaCollectionInterface } from './Interface'

class RuaCollection extends AbstractRuaPackage implements RuaCollectionInterface {

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
    return this.store
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
}

export default RuaCollection
