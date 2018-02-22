import { CanConfig } from 'rua-core/lib/Contracts'
import { AnyObject } from 'rua-core/lib/Types'
import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'

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
  public configurableModules: string[] = [
    'fetch',
  ]

  public config(configuration?: RuaConfiguration): Rua
  {
    return this
  }
}