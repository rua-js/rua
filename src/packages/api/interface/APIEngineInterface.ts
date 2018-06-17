import { AnyObject } from '../../type/data'

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
  call(name: string): any

  /**
   * Merge multiple api into store
   *
   * @param {AnyObject} name
   */
  merge(api: AnyObject): void
}

export default APIEngineInterface
