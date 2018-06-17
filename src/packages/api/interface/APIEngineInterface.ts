import AnyObject from 'rua-core/lib/Types/AnyObject'

interface APIEngineInterface {
  /**
   * Loads multiple api
   *
   * @param {AnyObject} api
   * @returns {boolean}
   */
  load(api: AnyObject): void

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

  /**
   * Merge multiple api into store
   *
   * @param {AnyObject} name
   */
  merge(api: AnyObject): void
}

export default APIEngineInterface
