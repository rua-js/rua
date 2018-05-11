import AbstractRuaPackage from 'rua-core/lib/Abstractions/AbstractRuaPackage'
import AnyObject from 'rua-core/lib/Types/AnyObject'
import CanConfig from 'rua-core/lib/Contracts/CanConfig'
import * as _ from 'lodash'

import { util } from '../Util'
import { fetch as _fetch } from '../Fetch'
import { ApiConfiguration } from './Type'

class Api extends AbstractRuaPackage implements CanConfig
{

  /**
   * Fetch instance
   * @type {Function}
   */
  protected fetch = _fetch

  /**
   * @constructor
   * @param {AnyObject} config
   */
  constructor(config?: AnyObject)
  {
    super()
    this.config(config)
    this.booted = true
  }

  /**
   * Configures
   *
   * @param {AnyObject} config
   */
  public config(config?: ApiConfiguration): void
  {
    if (!config)
    {
      return
    }

    const {
      data,
    } = config

    this.load(data)
  }

  /**
   * Loads multiple api
   *
   * @param {AnyObject} api
   * @returns {boolean}
   */
  public load(api: AnyObject): void
  {
    if (!api)
    {
      return
    }

    this.store = api
  }

  /**
   * Gets all api
   *
   * @returns {AnyObject}
   */
  public all(): AnyObject
  {
    return this.store
  }

  /**
   * Calls an api
   *
   * @returns {any}
   */
  public call(name: string, data?: AnyObject): Promise<Response>
  {
    const config = _.get(this.store, name)

    // make sure has the api
    util.invariant(
      config,
      '[Rua][API]The api that you are trying to access is NOT exists'
    )

    const {
      url,
      ...restConfig
    } = config

    return this.fetch(url, restConfig)
  }
}

export default Api
