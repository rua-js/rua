import { AnyObject } from 'rua-core/lib/Types'
import fetch from './ThirdParty/fetch'
import AbstractRuaPackage from "rua-core/lib/Abstractions/AbstractRuaPackage";
import CanConfig from "rua-core/lib/Contracts/CanConfig";
import * as _ from 'lodash'

class RuaFetch extends AbstractRuaPackage implements CanConfig {
  public interceptors = []

  public config(config?: AnyObject): void {
    const {
      interceptors,
      headers,
    } = config

    this.setInterceptors(interceptors)
  }

  protected setInterceptors(interceptors: Function | Function[]): void {

  }

}

class RuaFetch2 {

  public static catchedFetch(url: string, options: AnyObject = {}): Promise<any> {

    return RuaFetch.fetch(url, options)
      .then(data => ({ data }))
      .catch(err => ({ err }))
  }

  public static fetch(url: string, options: AnyObject = {}): Promise<any> {
    // Define defaults
    const defaultHeaders: AnyObject = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      ...options.extraHeaders,
    }

    // Destruct options
    let {
      headers = defaultHeaders,
      body,
      ...rest
    } = options

    // Set multi-part header if body is FormData
    // Stringify body if body is NOT FormData
    if (body instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data'
    } else {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)
    }

    // Generates Options used by fetch
    const settings = {
      headers,
      body,
      ...rest,
    }

    return fetch(url, settings)
      .then(RuaFetch.checkStatus)
      .then(RuaFetch.parseJSON)
  }

  public static rawFetch = fetch

  public static parseJSON(response: Response): Promise<AnyObject> {
    return response.json()
  }

  public static checkStatus(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response
    }

    const error: any = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export default RuaFetch
