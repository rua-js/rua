import * as _ from 'lodash'

class ChainingIsEngine
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
   * @returns {ChainingIsEngine}
   */
  public get and(): ChainingIsEngine
  {
    this.orLogic = false
    return this
  }

  public get or(): ChainingIsEngine
  {
    this.orLogic = true
    return this
  }

  // public get xor(): ChainingIsEngine
  // {
  //   this.xorLogic = true
  //   return this
  // }

  public get not(): ChainingIsEngine
  {
    this.notLogic = true
    return this
  }

  /**
   * Conditions
   *
   * @returns {ChainingIsEngine}
   */

  // ======= None-lodash methods which requires test
  public get exception(): ChainingIsEngine
  {
    console.error('ChainingIsEngine.exception is NOT implemented yet')
    return this
  }

  public get false(): ChainingIsEngine
  {
    return this.runLogic(
      false
    )
  }

  public get true(): ChainingIsEngine
  {
    return this.runLogic(
      true
    )
  }

  // ======= Lodash methods which do NOT need test
  public get string(): ChainingIsEngine
  {
    return this.runLogic(
      _.isString(this.data)
    )
  }

  public get array(): ChainingIsEngine
  {
    return this.runLogic(
      _.isArray(this.data)
    )
  }

  public get arrayBuffer(): ChainingIsEngine
  {
    return this.runLogic(
      _.isArrayBuffer(this.data)
    )
  }

  public get arrayLike(): ChainingIsEngine
  {
    return this.runLogic(
      _.isArrayLike(this.data)
    )
  }

  public get arrayLikeObject(): ChainingIsEngine
  {
    return this.runLogic(
      _.isArrayLikeObject(this.data)
    )
  }

  public get boolean(): ChainingIsEngine
  {
    return this.runLogic(
      _.isBoolean(this.data)
    )
  }

  public get buffer(): ChainingIsEngine
  {
    return this.runLogic(
      _.isBuffer(this.data)
    )
  }

  public get date(): ChainingIsEngine
  {
    return this.runLogic(
      _.isDate(this.data)
    )
  }

  public get element(): ChainingIsEngine
  {
    return this.runLogic(
      _.isElement(this.data)
    )
  }

  public get empty(): ChainingIsEngine
  {
    return this.runLogic(
      _.isEmpty(this.data)
    )
  }

  public get error(): ChainingIsEngine
  {
    return this.runLogic(
      _.isError(this.data)
    )
  }

  public get finite(): ChainingIsEngine
  {
    return this.runLogic(
      _.isFinite(this.data)
    )
  }

  public get function (): ChainingIsEngine
  {
    return this.runLogic(
      _.isFunction(this.data)
    )
  }

  public get integer(): ChainingIsEngine
  {
    return this.runLogic(
      _.isInteger(this.data)
    )
  }

  public get length(): ChainingIsEngine
  {
    return this.runLogic(
      _.isLength(this.data)
    )
  }

  public get Map(): ChainingIsEngine
  {
    return this.runLogic(
      _.isMap(this.data)
    )
  }

  public get NaN(): ChainingIsEngine
  {
    return this.runLogic(
      _.isNaN(this.data)
    )
  }

  public get native(): ChainingIsEngine
  {
    return this.runLogic(
      _.isNative(this.data)
    )
  }

  public get nil(): ChainingIsEngine
  {
    return this.runLogic(
      _.isNil(this.data)
    )
  }

  public get null(): ChainingIsEngine
  {
    return this.runLogic(
      _.isNull(this.data)
    )
  }

  public get number(): ChainingIsEngine
  {
    return this.runLogic(
      _.isNumber(this.data)
    )
  }

  public get object(): ChainingIsEngine
  {
    return this.runLogic(
      _.isObject(this.data)
    )
  }

  public get objectLike(): ChainingIsEngine
  {
    return this.runLogic(
      _.isObjectLike(this.data)
    )
  }

  public get plainObject(): ChainingIsEngine
  {
    return this.runLogic(
      _.isPlainObject(this.data)
    )
  }

  public get RegExp(): ChainingIsEngine
  {
    return this.runLogic(
      _.isRegExp(this.data)
    )
  }

  public get safeInteger(): ChainingIsEngine
  {
    return this.runLogic(
      _.isSafeInteger(this.data)
    )
  }

  public get Set(): ChainingIsEngine
  {
    return this.runLogic(
      _.isSet(this.data)
    )
  }

  public get symbol(): ChainingIsEngine
  {
    return this.runLogic(
      _.isSymbol(this.data)
    )
  }

  public get TypedArray(): ChainingIsEngine
  {
    return this.runLogic(
      _.isTypedArray(this.data)
    )
  }

  public get undefined(): ChainingIsEngine
  {
    return this.runLogic(
      _.isUndefined(this.data)
    )
  }

  public get WeakMap(): ChainingIsEngine
  {
    return this.runLogic(
      _.isWeakMap(this.data)
    )
  }

  public get WeakSet(): ChainingIsEngine
  {
    return this.runLogic(
      _.isWeakSet(this.data)
    )
  }

  public match(other: any): ChainingIsEngine
  {
    return this.runLogic(
      _.isMatch(this.data, other)
    )
  }

  public matchWith(other: any, customizer: _.isMatchCustomizer): ChainingIsEngine
  {
    return this.runLogic(
      _.isMatchWith(this.data, other, customizer)
    )
  }

  public equal(other: any): ChainingIsEngine
  {
    return this.runLogic(
      _.isEqual(this.data, other)
    )
  }

  public equalWith(other: any, customizer: _.IsEqualCustomizer): ChainingIsEngine
  {
    return this.runLogic(
      _.isEqualWith(this.data, other, customizer)
    )
  }

  /**
   *
   * @param {boolean} result
   * @returns {ChainingIsEngine}
   */
  protected runLogic(result: boolean): ChainingIsEngine
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

export default ChainingIsEngine
