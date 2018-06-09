import * as _ from 'lodash'

class Is
{
  public result: any = null
  protected data: any = null
  protected orLogic: boolean = false
  protected notLogic: boolean = false

  constructor(data: any)
  {
    this.data = data
    this.result = data
  }

  /**
   * Logic comparator
   *
   * @returns {Is}
   */
  public get and(): Is
  {
    this.orLogic = false
    return this
  }

  public get or(): Is
  {
    this.orLogic = true
    return this
  }

  public get not(): Is
  {
    this.notLogic = true
    return this
  }

  /**
   * Conditions
   *
   * @returns {Is}
   */
  public get string(): Is
  {
    return this.runLogic(
      _.isString(this.data)
    )
  }

  public get array(): Is
  {
    return this.runLogic(
      _.isArray(this.data)
    )
  }

  public get arrayBuffer(): Is
  {
    return this.runLogic(
      _.isArrayBuffer(this.data)
    )
  }

  public get arrayLike(): Is
  {
    return this.runLogic(
      _.isArrayLike(this.data)
    )
  }

  public get arrayLikeObject(): Is
  {
    return this.runLogic(
      _.isArrayLikeObject(this.data)
    )
  }

  public get boolean(): Is
  {
    return this.runLogic(
      _.isBoolean(this.data)
    )
  }

  public get buffer(): Is
  {
    return this.runLogic(
      _.isBuffer(this.data)
    )
  }

  public get date(): Is
  {
    return this.runLogic(
      _.isDate(this.data)
    )
  }

  public get element(): Is
  {
    return this.runLogic(
      _.isElement(this.data)
    )
  }

  public get empty(): Is
  {
    return this.runLogic(
      _.isEmpty(this.data)
    )
  }

  public get error(): Is
  {
    return this.runLogic(
      _.isError(this.data)
    )
  }

  public get exception(): Is
  {
    console.error('Is.exception is NOT implemented yet')
    return this
  }

  public get finite(): Is
  {
    return this.runLogic(
      _.isFinite(this.data)
    )
  }

  public get function(): Is
  {
    return this.runLogic(
      _.isFunction(this.data)
    )
  }

  public get integer(): Is
  {
    return this.runLogic(
      _.isInteger(this.data)
    )
  }

  public get length(): Is
  {
    return this.runLogic(
      _.isLength(this.data)
    )
  }

  public get Map(): Is
  {
    return this.runLogic(
      _.isMap(this.data)
    )
  }

  public get NaN(): Is
  {
    return this.runLogic(
      _.isNaN(this.data)
    )
  }

  public get native(): Is
  {
    return this.runLogic(
      _.isNative(this.data)
    )
  }

  public get nil(): Is
  {
    return this.runLogic(
      _.isNil(this.data)
    )
  }

  public get null(): Is
  {
    return this.runLogic(
      _.isNull(this.data)
    )
  }

  public get number(): Is
  {
    return this.runLogic(
      _.isNumber(this.data)
    )
  }

  public get object(): Is
  {
    return this.runLogic(
      _.isObject(this.data)
    )
  }

  public get objectLike(): Is
  {
    return this.runLogic(
      _.isObjectLike(this.data)
    )
  }

  public get plainObject(): Is
  {
    return this.runLogic(
      _.isPlainObject(this.data)
    )
  }

  public get RegExp(): Is
  {
    return this.runLogic(
      _.isRegExp(this.data)
    )
  }

  public get safeInteger(): Is
  {
    return this.runLogic(
      _.isSafeInteger(this.data)
    )
  }

  public get Set(): Is
  {
    return this.runLogic(
      _.isSet(this.data)
    )
  }

  public get symbol(): Is
  {
    return this.runLogic(
      _.isSymbol(this.data)
    )
  }

  public get TypedArray(): Is
  {
    return this.runLogic(
      _.isTypedArray(this.data)
    )
  }

  public get undefined(): Is
  {
    return this.runLogic(
      _.isUndefined(this.data)
    )
  }

  public get WeakMap(): Is
  {
    return this.runLogic(
      _.isWeakMap(this.data)
    )
  }

  public get WeakSet(): Is
  {
    return this.runLogic(
      _.isWeakSet(this.data)
    )
  }

  public get false(): Is
  {
    return this.runLogic(
      false,
    )
  }

  public get true(): Is
  {
    return this.runLogic(
      true,
    )
  }

  public match(other: any): Is
  {
    return this.runLogic(
      _.isMatch(this.data, other)
    )
  }

  public matchWith(other: any, customizer: _.isMatchCustomizer): Is
  {
    return this.runLogic(
      _.isMatchWith(this.data, other, customizer)
    )
  }

  public equal(other: any): Is
  {
    return this.runLogic(
      _.isEqual(this.data, other)
    )
  }

  public equalWith(other: any, customizer: _.IsEqualCustomizer): Is
  {
    return this.runLogic(
      _.isEqualWith(this.data, other, customizer)
    )
  }

  /**
   *
   * @param {boolean} result
   * @returns {Is}
   */
  protected runLogic(result: boolean): Is
  {
    let currentResult = result

    if (this.notLogic)
    {
      currentResult = !currentResult
      this.notLogic = false
    }

    if (this.orLogic)
    {
      this.result = this.result || currentResult
      this.orLogic = false
      return this
    }

    this.result = this.result && currentResult
    return this
  }
}

export default Is

// Is('string').string.and.boolean.or.lessThan