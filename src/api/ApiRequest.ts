import * as Promise from 'bluebird'
import * as _ from 'lodash'
import { factory } from './factory'
import { RepositoryLite } from '../repository'
import { Request } from '../request'
import { ResponseData } from '../request/type'
import { AnyObject, NilableObjectOf } from '../rua/type/data'
import { ApiEntity } from './engine'
import { APIConfiguration } from './type'
import { invariant } from './util'

/**
 * ApiRequest is designed to solve bad shitty server-side api design
 *
 * NOTE: sometime, backend developers provide shit-like api to front-end developers, they fucked up
 * our code because the fucking api is really hard to understand, maintenance will be nightmare for
 * us, we need to abstract/wrap their anti-human api to human-friendly api
 *
 * NOTE: also, let developer who is new to the front-end development to do the request job
 * is devastating, we have to pack all hard part into one (like ApiRequest did),
 * let them easier to use, let us easier to manage project and control the code quality
 *
 * @class ApiRequest
 */
class ApiRequest implements PromiseLike<ResponseData>
{
  /**
   * Stores user request instance
   *
   * NOTE: request is called right after you call 'new ApiRequest'
   */
  protected request: Promise<ResponseData>

  /**
   * Global defaults, use new Rua() to set up is recommended
   *
   * NOTE: please remember static default settings is share with all ApiRequest,
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
   * NOTE: read docs about RepositoryLite to
   *
   * @type {RepositoryLite}
   */
  public static api: RepositoryLite = new RepositoryLite()

  /**
   * Create an ApiRequest instance and save necessary data for Request
   *
   * @constructor
   * @param namespace
   * @param data
   */
  public constructor(namespace: string, data?: NilableObjectOf<any>)
  {
    this.request = ApiRequest.start(namespace, data)
  }

  /**
   * Configure ApiRequest
   *
   * @param {AnyObject} config
   */
  public static config(config?: APIConfiguration): void
  {
    // do Nothing when no config is given
    if (!config)
    {
      return
    }

    // destruct variables to use later
    const {
      data,
      useFactoryOnProduction,
      factory,
    } = config

    // load api if it's given
    if (data)
    {
      ApiRequest.api.load(data as any)
    }

    // defaults reference
    const defaults = ApiRequest.defaults

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
   * Start a Request from current ApiRequest
   *
   * NOTE: we only call this method in .then() and .catch()
   *
   * @returns {any}
   */
  protected static start(namespace: string, data: NilableObjectOf<any> = {}): Promise<ResponseData>
  {
    // enable factory in ApiRequest
    const { defaults } = ApiRequest

    if (
      (defaults.useFactoryOnProduction || process.env.NODE_ENV !== 'production')
      && factory.has(namespace)
    )
    {
      return new Promise<any>((resolve => resolve(factory.make(namespace))))
    }

    // get configuration of one api (setting)
    const config = _.get(ApiRequest.api.all(), namespace)

    // make sure has the api
    invariant(config, `The api that you are trying to access is NOT exists: ${namespace}`)

    const { url, ...restConfig } = new ApiEntity(config).toObject()

    return new Request(url, data, { ...restConfig })
  }

  /**
   * finish subsequent task by calling .then()
   *
   * NOTE: this method delegates .catch() to Promise to do the rest work
   * @param params
   * @returns {Bluebird<any>}
   */
  public then(...params: any[]): Promise<ResponseData>
  {
    // pass parameters down to Request promise
    return this.request.then(...params)
  }

  /**
   * catch the exception in Promise of Request by calling .catch()
   *
   * NOTE: this method delegates .catch() to Promise to do the rest work
   *
   * @param params
   * @returns {Bluebird<any>}
   */
  public catch(...params: any[]): Promise<any>
  {
    // pass parameters down to Request promise
    // @ts-ignore: what i can do about this, parameter count problem
    return this.request.catch(...params)
  }
}

export default ApiRequest
