import AnyObject from 'rua-core/lib/Types/AnyObject'

interface ApiInterface {
  /**
   * Loads multiple api
   *
   * @param {AnyObject} api
   * @returns {boolean}
   */
  load(api: AnyObject): boolean

  /**
   * Gets all api
   *
   * @returns {AnyObject}
   */
  all(): AnyObject

  /**
   * Calls an api
   *
   * @returns {any}
   */
  dispatch(name: string): any
}

export default ApiInterface
