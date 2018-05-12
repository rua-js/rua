import { CanConfig } from 'rua-core/lib/Contracts'

import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'
import { ResourceInterface } from './Interface'
import { Resources, Color, Drawable } from './Type'
import { colors as defaultColors } from './Defaults'

/**
 * This class manages resource data/files
 *
 * @class Resource
 */
class Resource extends AbstractRuaPackage implements ResourceInterface, CanConfig
{

  /**
   * Color resource that initialized with default values
   *
   * @type {Color}
   */
  public color: Color = defaultColors

  public drawable: Drawable = {}

  /**
   * Set the booted status to true
   *
   * @constructor
   */
  constructor()
  {
    super()
    this.booted = true
  }

  /**
   * Define a read-only property for the instance
   *
   * @param {string} propertyName
   * @param propertyValue
   * @returns {any}
   */
  protected defineProperty(propertyName: string, propertyValue: any): any {
    // stop if no property value is given
    if (propertyValue === undefined) {
      return
    }

    // define a read-only property
    return Object.defineProperty(this, propertyName, {
      value: propertyValue,
      writable: false,
      enumerable: true,
      configurable: false,
    })
  }

  /**
   * Setup configuration
   *
   * @param {Resources} resource
   * @returns {boolean}
   */
  public config(resource: Resources): boolean
  {
    const {
      color,
      drawable,
    } = resource

    // define properties
    this.defineProperty('color', { ...defaultColors, ...color })
    this.defineProperty('drawable', drawable)

    return true
  }
}

export default Resource
