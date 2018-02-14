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
   * Default configurations
   *
   * @type {AnyObject}
   */
  protected configuration: AnyObject = {
    modules: ['*']
  }

  /**
   * All available modules
   * @type {any[]}
   */
  protected availableModules: Array<string> = []

  /**
   * Configs rua
   *
   * @param {AnyObject} config
   */
  public config(config?: AnyObject): AnyObject
  {
    // no configuration merge
    if (!config) {
      return this.configuration
    }

    // merge and return configuration
    return this.configuration = { ...this.configuration, ...config }
  }

  /**
   * Starts rua.js with configurations
   *
   * @param {AnyObject} config
   */
  public start(config?: AnyObject): void
  {
    this.config(config)

  }

  protected loadModules(): void
  {
    const modules = this.configuration.modules
    // load all modules if first modules is '*'
    if (modules[0] === '*')
    {

    }
  }
}