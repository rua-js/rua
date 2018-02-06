import AbstractRuaPackage from 'rua-core/lib/Abstractions/AbstractRuaPackage'
import { NilableObject, AnyObject } from 'rua-core/lib/Types'

class Rua extends AbstractRuaPackage {

  /**
   * Default configuration
   *
   * @type {AnyObject}
   */
  protected configuration: AnyObject = {}

  /**
   * Configures Rua.js packages
   *
   * @param {NilableObject} config
   * @returns {void | AnyObject}
   */
  public config(config?: NilableObject): void | AnyObject {
    if (!config) {
      return this.configuration
    }

    this.configuration = {...this.configuration, ...config}
  }
}