import * as Promise from 'bluebird'
import * as _ from 'lodash'
import { factory } from '../../factory'
import { Request } from '../../request'
import { ResponseData } from '../../request/type'
import { CanConfig } from '../../type'
import { AnyObject } from '../../type/data'
import { util } from '../../utility'
import { APIEngineInterface } from '../interface'
import { APIConfiguration, APIEntityObjectCollection } from '../type'
import APIEntity from './APIEntity'

class APIEngine implements APIEngineInterface, CanConfig
{
  public static defaults = {
    factory,
    useFactoryOnProduction: false,
  }

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
      useFactoryOnProduction = false,
      factory,
    } = config

    this.load(data as any)

    if (undefined !== useFactoryOnProduction)
    {
      APIEngine.defaults.useFactoryOnProduction = useFactoryOnProduction
    }

    if (factory)
    {
      APIEngine.defaults.factory = factory
    }
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
  public call = (name: string, data?: AnyObject): Promise<ResponseData> =>
  {
    // enable factory in API
    const defaults = APIEngine.defaults

    if (
      defaults.useFactoryOnProduction || process.env.NODE_ENV !== 'production'
      && factory.has(name)
    )
    {
      return new Promise<any>((resolve => resolve(factory.make(name))))
    }

    // get configuration of one api (setting)
    const config = _.get(this.store, name)

    // make sure has the api
    util.invariant(
      config,
      '[rua][api]The api that you are trying to access is NOT exists',
    )

    const { url, ...restConfig } = new APIEntity(config).toObject()

    return new Request(url, data, { ...restConfig })
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

  // protected request = Request

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
