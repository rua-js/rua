import AbstractRuaPackage from 'rua-core/lib/Abstractions/AbstractRuaPackage'
import AnyObject from 'rua-core/lib/Types/AnyObject'
import CanConfig from 'rua-core/lib/Contracts/CanConfig'
import * as _ from 'lodash'

import { util } from '../RuaUtil'
import { fetch as _fetch } from '../RuaFetch'

class RuaApi extends AbstractRuaPackage implements CanConfig{

  /**
   * Fetch instance
   * @type {Function}
   */
  protected fetch = _fetch

  /**
   * @constructor
   * @param {AnyObject} config
   */
  constructor(config?: AnyObject) {
    super()
    this.config(config)
    this.booted = true
  }

  /**
   * Configures
   *
   * @param {AnyObject} config
   */
  public config(config?: AnyObject): void {
    if (!config) {
      return
    }

    const {
      fetch = _fetch,
    } = config

    this.fetch = fetch
  }

  /**
   * Loads multiple api
   *
   * @param {AnyObject} api
   * @returns {boolean}
   */
  public load(api: AnyObject): boolean {
    this.store = api
    return true
  }

  /**
   * Gets all api
   *
   * @returns {AnyObject}
   */
  public all(): AnyObject {
    return this.store
  }

  /**
   * Calls an api
   *
   * @returns {any}
   */
  public call(name: string, data?: AnyObject): Promise<Response> {
    const config = _.get(this.store, name)
    // make sure has the api
    util.invariant(
      config,
      '[Rua][API]The api that you are trying to access is NOT exists'
    )

    const {
      url,
      ...rest
    } = config

    return this.fetch(url, rest)
  }
}

export default RuaApi
