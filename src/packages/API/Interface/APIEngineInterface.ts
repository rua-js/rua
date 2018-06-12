import AnyObject from 'rua-core/lib/Types/AnyObject'

interface APIEngineInterface {
  /**
   * Loads multiple API
   *
   * @param {AnyObject} api
   * @returns {boolean}
   */
  load(api: AnyObject): boolean

  /**
   * Gets all API
   *
   * @returns {AnyObject}
   */
  all(): AnyObject

  /**
   * Calls an API
   *
   * @returns {any}
   */
  dispatch(name: string): any
}

export default APIEngineInterface
