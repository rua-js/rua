// Third-party dependency
// Bridged dependency
import { RuaDva } from './Bridge'
// RuaCore dependency
import { AnyObject } from 'rua-core/lib/Types'
// Self dependency
import { request } from '../request'
import { API } from '../API'
import { RuaConfiguration } from './Type'
import * as _ from 'lodash'

/**
 * Rua Class manages/configs all packages
 *
 * @class Rua.js
 */
class Rua
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
    api: API,
    dva: RuaDva,
  }

  public app: any

  constructor(configuration?: RuaConfiguration)
  {
    // merge configuration
    const configs: AnyObject = { ...this.defaultConfiguration, ...configuration }

    // iterate configuration and find its module
    for (const name in configs)
    {
      const module = this.configurableModules[name] // find corresponding module

      if (!module) // continue to next configuration if it is NOT a configurable module
      {
        continue
      }

      // configuration for this module
      const config = configs[name]

      // config the module
      const result = module.config(config)

      if (name === 'dva')
      {
        this.app = result
      }
    }
  }
}

export default Rua
