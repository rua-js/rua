// Third-party dependency
// Bridged dependency
import { RuaDva } from './Bridge'
// RuaCore dependency
import { CanConfig } from 'rua-core/lib/Contracts'
import { AnyObject } from 'rua-core/lib/Types'
import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'

// Self dependency
import { fetch } from '../Fetch'
import { api } from '../Api'
import { resource } from '../Resource'
import { RuaConfiguration } from './Type'

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
    api,
    fetch,
    resource,
    dva: RuaDva
  }

  public config(configuration?: RuaConfiguration): void
  {
    // merge configuration
    const configs: AnyObject = { ...this.defaultConfiguration, ...configuration }

    // iterate configuration and find its module
    for (const name in configs)
    {
      const module = this.configurableModules[name] // find corresponding module

      if (!module) // abort if it is NOT a configurable module
      {
        return
      }

      // configuration for this module
      const config = configs[name]

      // config the module
      module.config(config)
    }
  }
}

export default Rua
