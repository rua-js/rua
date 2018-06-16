import AnyObject from 'rua-core/lib/Types/AnyObject'
import CanConfig from 'rua-core/lib/Contracts/CanConfig'
import * as _ from 'lodash'

import { util } from '../../Utility'
import { request } from '../../request'
import { APIConfiguration } from '../Type'
import APIEntity from './APIEntity'
import APIEntityObjectCollection from '../Type/APIEntityObjectCollection'
import APIEngineInterface from '../Interface/APIEngineInterface'

class APIEngine implements APIEngineInterface, CanConfig
{

  /**
   * Configures
   *
   * @param {AnyObject} config
   */
  public config = (config?: APIConfiguration): void =>
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
  public load = (api?: APIEntityObjectCollection): void =>
  {
    if (!api)
    {
      return
    }

    this.store = api
  }

  public merge = (api?: APIEntityObjectCollection): void =>
  {
    if (!api)
    {
      return
    }

    this.store = { ...this.store, ...api }
  }

  /**
   * Gets all API
   *
   * @returns {AnyObject}
   */
  public all = (): AnyObject =>
  {
    return this.store
  }
  /**
   * Calls an API
   *
   * @returns {any}
   */
  public call = (name: string, data?: AnyObject): Promise<Response> =>
  {
    // get configuration of one API (setting)
    const config = _.get(this.store, name)

    // make sure has the API
    util.invariant(
      config,
      '[Rua][API]The API that you are trying to access is NOT exists',
    )

    const {
      url,
      ...restConfig,
    } = new APIEntity(config).toObject()

    return this.request(url, { ...restConfig, body: data })
  }
  /**
   * Store user defined API
   *
   * @type {{}}
   */
  protected store: any = {}
  /**
   * Fetch instance
   * @type {Function}
   */
  protected request = request

  /**
   * @constructor
   * @param {AnyObject} config
   */
  public constructor(config?: AnyObject)
  {
    // config
    this.config(config)
  }

}

export default APIEngine
