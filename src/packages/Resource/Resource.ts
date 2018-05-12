import { CanConfig } from 'rua-core/lib/Contracts'

import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'
import { ResourceInterface } from './Interface'
import { Resources, Color, } from './Type'
import { colors as defaultColors } from './Defaults'

class Resource extends AbstractRuaPackage implements ResourceInterface, CanConfig
{

  public color: Color = defaultColors

  public drawable: Color = {}

  constructor()
  {
    super()
    this.booted = true
  }

  protected defineProperty(propertyName: string, propertyValue: any): any {
    return Object.defineProperty(this, propertyName, {
      value: propertyValue,
      writable: false,
      enumerable: true,
      configurable: false,
    })
  }

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
