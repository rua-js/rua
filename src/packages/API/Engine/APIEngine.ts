import AbstractRuaPackage from 'rua-core/lib/Abstractions/AbstractRuaPackage'
import AnyObject from 'rua-core/lib/Types/AnyObject'
import CanConfig from 'rua-core/lib/Contracts/CanConfig'
import * as _ from 'lodash'

import { util } from '../../Util'
import { request } from '../../Request'
import { APIConfiguration } from '../Type'

class APIEngine extends AbstractRuaPackage implements CanConfig
{

  /**
   * Fetch instance
   * @type {Function}
   */
  protected request = request

  /**
   * @constructor
   * @param {AnyObject} config
   */
  constructor(config?: AnyObject)
  {
    super()

    // binding
    this.config = this.config.bind(this)
    this.load = this.load.bind(this)
    this.all = this.all.bind(this)
    this.call = this.call.bind(this)

    // config
    this.config(config)
    this.booted = true
  }

  /**
   * Configures
   *
   * @param {AnyObject} config
   */
  public config(config?: APIConfiguration): void
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
   * Loads multiple API
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
   * Gets all API
   *
   * @returns {AnyObject}
   */
  public all(): AnyObject
  {
    return this.store
  }

  /**
   * Calls an API
   *
   * @returns {any}
   */
  public call(name: string, data?: AnyObject): Promise<Response>
  {
    // get configuration of one API (setting)
    const config = _.get(this.store, name)

    // make sure has the API
    util.invariant(
      config,
      '[Rua][API]The API that you are trying to access is NOT exists'
    )

    const {
      url,
      ...restConfig
    } = config

    return this.request(url, {...restConfig, body: data})
  }
}

export default APIEngine
