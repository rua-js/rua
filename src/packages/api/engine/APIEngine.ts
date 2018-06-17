import CanConfig from 'rua-core/lib/Contracts/CanConfig'
import * as _ from 'lodash'

import { util } from '../../utility'
import { request } from '../../request'
import { APIConfiguration } from '../type'
import APIEntity from './APIEntity'
import APIEntityObjectCollection from '../type/APIEntityObjectCollection'
import APIEngineInterface from '../interface/APIEngineInterface'
import { AnyObject } from '../../type/data'

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
   * Loads multiple api
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
   * Gets all api
   *
   * @returns {AnyObject}
   */
  public all = (): AnyObject =>
  {
    return this.store
  }
  /**
   * Calls an api
   *
   * @returns {any}
   */
  public call = (name: string, data?: AnyObject): Promise<Response> =>
  {
    // get configuration of one api (setting)
    const config = _.get(this.store, name)

    // make sure has the api
    util.invariant(
      config,
      '[rua][api]The api that you are trying to access is NOT exists',
    )

    const {
      url,
      ...restConfig
    } = new APIEntity(config).toObject()

    return this.request(url, { ...restConfig, body: data })
  }
  /**
   * Store user defined api
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
