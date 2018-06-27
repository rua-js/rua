import * as Promise from 'bluebird'
import * as _ from 'lodash'
import { factory } from '../factory'
import { RepositoryLite } from '../repository'
import { Request } from '../request'
import { ResponseData } from '../request/type'
import { AnyObject } from '../type/data'
import { APIEntity } from './engine'
import { APIEngineInterface } from './interfaces'
import { APIConfiguration } from './type'
import { invariant } from './util'

class APIRequest implements APIEngineInterface
{
  /**
   * Global defaults, use new Rua() to set up is recommended
   *
   * @type {any}
   */
  public static defaults = {
    factory,
    useFactoryOnProduction: false,
  }

  /**
   * Store user defined api
   *
   * @type {{}}
   */
  public static api: any = new RepositoryLite()

  /**
   * @constructor
   * @param name
   * @param data
   */
  public constructor(name: string, data?: AnyObject)
  {
    return APIRequest.start(name, data)
  }

  /**
   * Configures
   *
   * @param {AnyObject} config
   */
  public static config(config?: APIConfiguration): void
  {
    if (!config)
    {
      return
    }

    const {
      data,
      useFactoryOnProduction,
      factory,
    } = config

    // load api if it is given
    if (data)
    {
      APIRequest.api.load(data as any)
    }

    // defaults reference
    const defaults = APIRequest.defaults

    if (useFactoryOnProduction)
    {
      defaults.useFactoryOnProduction = true
    }

    if (factory)
    {
      defaults.factory = factory
    }
  }

  /**
   * Calls an api
   *
   * @returns {any}
   */
  protected static start(name: string, data?: AnyObject): Promise<ResponseData>
  {
    // enable factory in APIRequest
    const defaults = APIRequest.defaults

    if (
      (defaults.useFactoryOnProduction || process.env.NODE_ENV !== 'production')
      && factory.has(name)
    )
    {
      return new Promise<any>((resolve => resolve(factory.make(name))))
    }

    // get configuration of one api (setting)
    const config = _.get(APIRequest.api.data, name)

    // make sure has the api
    invariant(config, 'The api that you are trying to access is NOT exists')

    const { url, ...restConfig } = new APIEntity(config).toObject()

    return new Request(url, data, { ...restConfig })
  }
}

export default APIRequest
