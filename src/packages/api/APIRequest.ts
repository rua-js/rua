import * as Promise from 'bluebird'
import * as _ from 'lodash'
import { factory } from '../factory'
import { RepositoryLite } from '../repository'
import { Request } from '../request'
import { ResponseData } from '../request/type'
import { AnyObject, NilableObjectOf } from '../core/type/data'
import { APIEntity } from './engine'
import { APIConfiguration } from './type'
import { invariant } from './util'

/**
 * APIRequest is designed to solve bad shitty server-side api design
 *
 * NOTE: sometime, backend developers provide shit-like api to front-end developers, they fucked up
 * our code because the fucking api is really hard to understand, maintenance will be nightmare for
 * us, we need to abstract/wrap their anti-human api to human-friendly api
 *
 * NOTE: also, let developer who is new to the front-end development to do the request job
 * is devastating, we have to pack all hard part into one (like APIRequest did),
 * let them easier to use, let us easier to manage project and control the code quality
 *
 * @class APIRequest
 */
class APIRequest
{
  /**
   * Stores user request instance
   *
   * NOTE: request is undefined until user called .then() of .catch()
   */
  protected request: Promise<ResponseData> | undefined = undefined

  /**
   * Stores user request namespace
   *
   * NOTE: namespace is the alias of one user-defined request information
   * NOTE: Because APIRequest only start a request after user called .then(),
   * so, we store data here to use it in future
   *
   * @type {string}
   */
  protected namespace: string

  /**
   * Stores user request data
   *
   * NOTE: Because APIRequest only start a request after user called .then(),
   * so, we store data here to use it in future
   *
   * @type {NilableObjectOf<any>}
   */
  protected data: NilableObjectOf<any>

  /**
   * Global defaults, use new Rua() to set up is recommended
   *
   * NOTE: please remember static default settings is share with all APIRequest,
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
   * Create an APIRequest instance and save nesassary data for Request
   *
   * @constructor
   * @param namespace
   * @param data
   */
  public constructor(namespace: string, data?: NilableObjectOf<any>)
  {
    this.namespace = namespace
    this.data = data
  }

  /**
   * Configure APIRequest
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
   * Start a Request from current APIRequest
   *
   * NOTE: we only call this method in .then() and .catch()
   *
   * @returns {any}
   */
  protected start(): Promise<ResponseData>
  {
    // take out required Request data
    const namespace = this.namespace
    const data = this.data

    // enable factory in APIRequest
    const { defaults } = APIRequest

    if (
      (defaults.useFactoryOnProduction || process.env.NODE_ENV !== 'production')
      && factory.has(namespace)
    )
    {
      return new Promise<any>((resolve => resolve(factory.make(namespace))))
    }

    // get configuration of one api (setting)
    const config = _.get(APIRequest.api.all(), namespace)

    // make sure has the api
    invariant(config, 'The api that you are trying to access is NOT exists')

    const { url, ...restConfig } = new APIEntity(config).toObject()

    return new Request(url, data, { ...restConfig })
  }

  /**
   * finish subsequent task by calling .then()
   *
   * NOTE: this method delegates .catch() to Promise to do the rest work
   * @param params
   * @returns {Bluebird<any>}
   */
  public then(...params: any[]): Promise<any>
  {
    // start a request if NOT started
    if (!this.request)
    {
      this.request = this.start()
    }

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
    // start a request if NOT started
    if (!this.request)
    {
      this.request = this.start()
    }

    // pass parameters down to Request promise
    // @ts-ignore: what i can do about this, parameter count problem
    return this.request.catch(...params)
  }
}

export default APIRequest
