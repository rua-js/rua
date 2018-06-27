import * as Promise from 'bluebird'
import * as _ from 'lodash'
import { factory } from '../factory'
import { RepositoryLite } from '../repository'
import { Request } from '../request'
import { ResponseData } from '../request/type'
import { AnyObject } from '../type/data'
import { APIEntity } from './engine'
import { APIConfiguration } from './type'
import { invariant } from './util'

/**
 *
 *
 * @class APIRequest
 */
class APIRequest
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
   * User defined api
   *
   * @type {{}}
   */
  public static api: RepositoryLite = new RepositoryLite()

  /**
   * Create an api request
   * NOTE: Promise is returned instead of instance of APIRequest
   *
   * @constructor
   * @param name
   * @param data
   */
  public constructor(name: string, data?: AnyObject)
  {
    return APIRequest.start(name, data)
  }

  /**
   * Configure APIRequest
   *
   * @param {AnyObject} config
   */
  public static config(config?: APIConfiguration): void
  {
    // terminate when no config is given
    if (!config)
    {
      return
    }

    // destruct variables
    const {
      data,
      useFactoryOnProduction,
      factory,
    } = config

    // load api if it's given
    if (data)
    {
      APIRequest.api.load(data as any)
    }

    // defaults reference
    const defaults = APIRequest.defaults

    // save factory config
    if (useFactoryOnProduction)
    {
      defaults.useFactoryOnProduction = true
    }

    // save factory if it's given
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
    const config = _.get(APIRequest.api.all(), name)

    // make sure has the api
    invariant(config, 'The api that you are trying to access is NOT exists')

    const { url, ...restConfig } = new APIEntity(config).toObject()

    return new Request(url, data, { ...restConfig })
  }
}

export default APIRequest
