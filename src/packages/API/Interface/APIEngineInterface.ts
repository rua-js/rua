import AnyObject from 'rua-core/lib/Types/AnyObject'

interface APIEngineInterface {
  /**
   * Loads multiple API
   *
   * @param {AnyObject} api
   * @returns {boolean}
   */
  load(api: AnyObject): void

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

  /**
   * Merge multiple api into store
   *
   * @param {AnyObject} name
   */
  merge(api: AnyObject): void
}

export default APIEngineInterface
