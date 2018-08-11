import { AnyData, AnyObject } from '../../core/type/data'
import { RepositoryInterface } from '../Interface'
import {
  RepositoryConfiguration,
  RepositoryHooks,
} from '../type'
import * as _ from 'lodash'
import { Interpolator } from '../../core/type/function'

class Repository implements RepositoryInterface
{
  /**
   * Stored data of repository
   *
   * @type {AnyObject}
   */
  protected data: AnyObject = {}

  /**
   * Hook functions
   *
   * @type {RepositoryHooks}
   */
  protected hooks: RepositoryHooks

  /**
   * WARNING: accessing boolean property from a class cost THREE times MORE
   * SO, we use config instead
   *
   * Indicates should use the reference of data or copy of it
   *
   * @type {boolean}
   */
    // protected shouldDeepClone: boolean

  protected config: any

  /**
   * Config the instance
   *
   * @constructor
   * @param {RepositoryConfiguration} config
   */
  constructor(config: RepositoryConfiguration = {})
  {
    const {
      hooks = {},
      shouldDeepClone,
    } = config

    this.hooks = hooks
    // this.shouldDeepClone = shouldDeepClone
    this.config = config
  }

  /**
   * Get length of stored data
   *
   * @returns {number}
   */
  public get length(): number
  {
    return Object.keys(this.data).length
  }

  public set(
    key: string | string[],
    data: AnyData,
    interpolator?: Interpolator,
  ): AnyData
  {
    // use .multiSet instead if key is an array
    if (Array.isArray(key))
    {
      return this.multiSet(key, Array.from(data || []))
    }

    // apply before hook
    const beforeHook = this.hooks.beforeSet

    if (beforeHook)
    {
      beforeHook(this, key, data, interpolator)
    }

    // deep clone data
    if (this.config.shouldDeepClone)
    {
      /* tslint:disable */
      data = _.clone(data)
      /* tslint:enable */
    }

    // finish .set
    let returnData: AnyData = (this.data[key] = data)

    // apply interpolator
    returnData = interpolator ? interpolator(returnData) : returnData

    // apply after hook
    const afterHook = this.hooks.afterSet

    if (afterHook)
    {
      afterHook(this, key, data, interpolator, returnData)
    }

    return returnData
  }

  public get(
    key: string | string[],
    defaultValue?: AnyData,
    interpolator?: Interpolator,
  ): AnyData
  {
    // use .multiGet instead if key is an array
    if (Array.isArray(key))
    {
      return this.multiGet(key, Array.from(defaultValue || []))
    }

    // apply before hook
    const beforeHook = this.hooks.beforeGet

    if (beforeHook)
    {
      beforeHook(this, key, interpolator)
    }

    let returnData: AnyData = interpolator
      ? interpolator(this.data[key] || defaultValue)
      : this.data[key] || defaultValue

    // deep clone data
    if (this.config.shouldDeepClone)
    {
      returnData = _.clone(returnData)
    }

    // apply after hook
    const afterHook = this.hooks.afterGet

    if (afterHook)
    {
      afterHook(this, key, defaultValue, interpolator, returnData)
    }

    return returnData
  }

  public
  remove(
    key: string | string[],
    interpolator?: Interpolator,
  ): AnyData
  {
    // use .multiRemove instead if key is an array
    if (Array.isArray(key))
    {
      return this.multiRemove(key)
    }

    // apply before hook
    const beforeHook = this.hooks.beforeRemove

    if (beforeHook)
    {
      beforeHook(this, key, interpolator)
    }

    let returnData: AnyData = this.data[key]
    delete this.data[key]

    // deep clone data
    if (this.config.shouldDeepClone)
    {
      returnData = _.clone(returnData)
    }

    // apply after hook
    const afterHook = this.hooks.afterRemove

    if (afterHook)
    {
      afterHook(this, key, interpolator, returnData)
    }

    return returnData
  }

  public clear(interpolator?: Interpolator): AnyObject
  {
    // apply before hook
    const beforeHook = this.hooks.beforeClear

    if (beforeHook)
    {
      beforeHook(this, interpolator)
    }

    let returnData: AnyObject = this.data
    this.data = {}

    // deep clone data
    if (this.config.shouldDeepClone)
    {
      returnData = _.clone(returnData)
    }

    // apply after hook
    const afterHook = this.hooks.afterClear

    if (afterHook)
    {
      afterHook(this, interpolator, returnData)
    }

    return returnData
  }

  public keys(interpolator?: Interpolator): string[]
  {
    // apply before hook
    const beforeHook = this.hooks.beforeKeys

    if (beforeHook)
    {
      beforeHook(this, interpolator)
    }

    // compute return data
    const returnData: string[] = interpolator
      ? interpolator(Object.keys(this.data))
      : Object.keys(this.data)

    // apply after hook
    const afterHook = this.hooks.afterKeys

    if (afterHook)
    {
      afterHook(this, interpolator, returnData)
    }

    return returnData
  }

  public values(interpolator?: Interpolator): AnyData[]
  {
    // apply before hook
    const beforeHook = this.hooks.beforeValues

    if (beforeHook)
    {
      beforeHook(this, interpolator)
    }

    const returnData: AnyData[] = interpolator
      ? interpolator(Object.values(this.data))
      : Object.values(this.data)

    // apply after hook
    const afterHook = this.hooks.afterValues

    if (afterHook)
    {
      afterHook(this, interpolator, returnData)
    }

    return returnData
  }

  public all(interpolator?: Interpolator): AnyObject
  {
    // apply before hook
    const beforeHook = this.hooks.beforeAll

    if (beforeHook)
    {
      beforeHook(this, interpolator)
    }

    let returnData: AnyObject = this.data

    // deep clone data
    if (this.config.shouldDeepClone)
    {
      returnData = _.clone(returnData)
    }

    // apply after hook
    const afterHook = this.hooks.afterAll

    if (afterHook)
    {
      afterHook(this, interpolator, returnData)
    }

    return returnData
  }

  protected multiRemove(
    key: string[],
    interpolator?: Interpolator,
  ): AnyData[]
  {
    // apply before hook
    const beforeHook = this.hooks.beforeMultiRemove

    if (beforeHook)
    {
      beforeHook(this, key, interpolator)
    }

    const returnData: AnyData[] = key.map(k => this.remove(k))

    // apply after hook
    const afterHook = this.hooks.afterMultiRemove

    if (afterHook)
    {
      afterHook(this, key, interpolator, returnData)
    }

    return returnData
  }

  protected multiGet(
    key: string[],
    defaultValue: AnyData[],
    interpolator?: Interpolator,
  ): AnyData[]
  {
    // apply before hook
    const beforeHook = this.hooks.beforeMultiGet

    if (beforeHook)
    {
      beforeHook(this, key, defaultValue, interpolator)
    }

    const returnData: AnyData[] = key.map((k, i) => this.get(k, defaultValue[i]))

    // apply after hook
    const afterHook = this.hooks.afterMultiGet

    if (afterHook)
    {
      afterHook(this, key, defaultValue, interpolator, returnData)
    }

    return returnData
  }

  protected multiSet(
    key: string[],
    data: AnyData[],
    interpolator?: Interpolator,
  ): AnyData[]
  {
    // apply before hook
    const beforeHook = this.hooks.beforeMultiSet

    if (beforeHook)
    {
      beforeHook(this, key, data, interpolator)
    }

    const returnData: AnyData[] = key.map((k, i) => this.set(k, data[i]))

    // apply after hook
    const afterHook = this.hooks.afterMultiSet

    if (afterHook)
    {
      afterHook(this, key, data, interpolator, returnData)
    }

    return returnData
  }
}

export default Repository
