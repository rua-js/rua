import { CanConfig } from 'rua-core/lib/Contracts'
import { AnyObject } from 'rua-core/lib/Types'

/**
 * Rua Class manages/configs all packages
 *
 * @class Rua.js
 */
class Rua implements CanConfig
{
  /**
   * Default configuration
   *
   * @type {AnyObject}
   */
  protected configuration: AnyObject = {}

  /**
   * Configs rua
   *
   * @param {AnyObject} config
   */
  public config(config: AnyObject): void
  {
    if (!config) {
      return
    }
    this.configuration = {...this.configuration, ...config}
  }

  public start(config: AnyObject): void {

  }
}