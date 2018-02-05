import AbstractRuaPackage from 'rua-core/lib/Abstractions/AbstractRuaPackage'
import { RuaApiInterface } from './Interface'
import AnyObject from 'rua-core/lib/Types/AnyObject'

class RuaApi extends AbstractRuaPackage implements RuaApiInterface{

  constructor() {
    super()
    this.booted = true
  }

  /**
   * Loads multiple api
   *
   * @param {AnyObject} api
   * @returns {boolean}
   */
  public load(api: AnyObject): boolean {
    this.store = api
    return true
  }

  /**
   * Gets all api
   *
   * @returns {AnyObject}
   */
  public all(): AnyObject {
    return this.store
  }
}

export default RuaApi