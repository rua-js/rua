// RuaCore Dependency
import { CanConfig } from 'rua-core/lib/Contracts'
import { AnyObject } from 'rua-core/lib/Types'
import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'
// Self Dependency
import { fetch } from '../Fetch'

import { RuaConfiguration } from './Contract'

/**
 * Rua Class manages/configs all packages
 *
 * @class Rua.js
 */
class Rua extends AbstractRuaPackage implements CanConfig
{

  /**
   * Default configuration
   *
   * @type {object}
   */
  public defaultConfiguration: RuaConfiguration = {}

  /**
   * Modules that can config
   *
   * @type {string[]}
   */
  public configurableModules: AnyObject = {
    fetch,
  }

  public config(configuration?: RuaConfiguration): void
  {
    // merge configuration
    const configs: AnyObject = { ...this.defaultConfiguration, ...configuration }

    for (const name in configs)
    {
      const module = this.configurableModules[name]

      // abort if it is NOT a configurable module
      if (!module)
      {
        return
      }

      const config = configs[name]

      module.config(config)
    }
  }
}