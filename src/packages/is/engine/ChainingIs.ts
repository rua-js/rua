import * as _ from 'lodash'

class ChainingIs
{
  public result: any = null
  protected data: any = null
  protected orLogic: boolean = false
  protected xorLogic: boolean = false
  protected notLogic: boolean = false

  constructor(data: any)
  {
    this.data = data
    this.result = data
  }

  /**
   * Logic comparator
   *
   * @returns {ChainingIs}
   */
  public get and(): ChainingIs
  {
    this.orLogic = false
    return this
  }

  public get or(): ChainingIs
  {
    this.orLogic = true
    return this
  }

  // public get xor(): ChainingIs
  // {
  //   this.xorLogic = true
  //   return this
  // }

  public get not(): ChainingIs
  {
    this.notLogic = true
    return this
  }

  /**
   * Conditions
   *
   * @returns {ChainingIs}
   */

  // ======= None-lodash methods which requires test
  public get exception(): ChainingIs
  {
    console.error('ChainingIs.exception is NOT implemented yet')
    return this
  }

  public get false(): ChainingIs
  {
    return this.runLogic(
      false
    )
  }

  public get true(): ChainingIs
  {
    return this.runLogic(
      true
    )
  }

  // ======= Lodash methods which do NOT need test
  public get string(): ChainingIs
  {
    return this.runLogic(
      _.isString(this.data)
    )
  }

  public get array(): ChainingIs
  {
    return this.runLogic(
      _.isArray(this.data)
    )
  }

  public get arrayBuffer(): ChainingIs
  {
    return this.runLogic(
      _.isArrayBuffer(this.data)
    )
  }

  public get arrayLike(): ChainingIs
  {
    return this.runLogic(
      _.isArrayLike(this.data)
    )
  }

  public get arrayLikeObject(): ChainingIs
  {
    return this.runLogic(
      _.isArrayLikeObject(this.data)
    )
  }

  public get boolean(): ChainingIs
  {
    return this.runLogic(
      _.isBoolean(this.data)
    )
  }

  public get buffer(): ChainingIs
  {
    return this.runLogic(
      _.isBuffer(this.data)
    )
  }

  public get date(): ChainingIs
  {
    return this.runLogic(
      _.isDate(this.data)
    )
  }

  public get element(): ChainingIs
  {
    return this.runLogic(
      _.isElement(this.data)
    )
  }

  public get empty(): ChainingIs
  {
    return this.runLogic(
      _.isEmpty(this.data)
    )
  }

  public get error(): ChainingIs
  {
    return this.runLogic(
      _.isError(this.data)
    )
  }

  public get finite(): ChainingIs
  {
    return this.runLogic(
      _.isFinite(this.data)
    )
  }

  public get function (): ChainingIs
  {
    return this.runLogic(
      _.isFunction(this.data)
    )
  }

  public get integer(): ChainingIs
  {
    return this.runLogic(
      _.isInteger(this.data)
    )
  }

  public get length(): ChainingIs
  {
    return this.runLogic(
      _.isLength(this.data)
    )
  }

  public get Map(): ChainingIs
  {
    return this.runLogic(
      _.isMap(this.data)
    )
  }

  public get NaN(): ChainingIs
  {
    return this.runLogic(
      _.isNaN(this.data)
    )
  }

  public get native(): ChainingIs
  {
    return this.runLogic(
      _.isNative(this.data)
    )
  }

  public get nil(): ChainingIs
  {
    return this.runLogic(
      _.isNil(this.data)
    )
  }

  public get null(): ChainingIs
  {
    return this.runLogic(
      _.isNull(this.data)
    )
  }

  public get number(): ChainingIs
  {
    return this.runLogic(
      _.isNumber(this.data)
    )
  }

  public get object(): ChainingIs
  {
    return this.runLogic(
      _.isObject(this.data)
    )
  }

  public get objectLike(): ChainingIs
  {
    return this.runLogic(
      _.isObjectLike(this.data)
    )
  }

  public get plainObject(): ChainingIs
  {
    return this.runLogic(
      _.isPlainObject(this.data)
    )
  }

  public get RegExp(): ChainingIs
  {
    return this.runLogic(
      _.isRegExp(this.data)
    )
  }

  public get safeInteger(): ChainingIs
  {
    return this.runLogic(
      _.isSafeInteger(this.data)
    )
  }

  public get Set(): ChainingIs
  {
    return this.runLogic(
      _.isSet(this.data)
    )
  }

  public get symbol(): ChainingIs
  {
    return this.runLogic(
      _.isSymbol(this.data)
    )
  }

  public get TypedArray(): ChainingIs
  {
    return this.runLogic(
      _.isTypedArray(this.data)
    )
  }

  public get undefined(): ChainingIs
  {
    return this.runLogic(
      _.isUndefined(this.data)
    )
  }

  public get WeakMap(): ChainingIs
  {
    return this.runLogic(
      _.isWeakMap(this.data)
    )
  }

  public get WeakSet(): ChainingIs
  {
    return this.runLogic(
      _.isWeakSet(this.data)
    )
  }

  public match(other: any): ChainingIs
  {
    return this.runLogic(
      _.isMatch(this.data, other)
    )
  }

  public matchWith(other: any, customizer: _.isMatchCustomizer): ChainingIs
  {
    return this.runLogic(
      _.isMatchWith(this.data, other, customizer)
    )
  }

  public equal(other: any): ChainingIs
  {
    return this.runLogic(
      _.isEqual(this.data, other)
    )
  }

  public equalWith(other: any, customizer: _.IsEqualCustomizer): ChainingIs
  {
    return this.runLogic(
      _.isEqualWith(this.data, other, customizer)
    )
  }

  /**
   *
   * @param {boolean} result
   * @returns {ChainingIs}
   */
  protected runLogic(result: boolean): ChainingIs
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

export default ChainingIs
