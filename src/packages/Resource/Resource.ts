import { CanConfig } from 'rua-core/lib/Contracts'

import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'
import { ResourceInterface } from './Interface'
import { Colors, Resources } from './Type'
import { colors as defaultColors } from './Defaults'

class Resource extends AbstractRuaPackage implements ResourceInterface, CanConfig
{

  public color: Colors = defaultColors

  constructor()
  {
    super()
    this.booted = true
  }

  public config(resource: Resources): boolean
  {
    const {
      colors,
    } = resource

    Object.defineProperty(this, 'color', {
      value: { ...defaultColors, ...colors },
      writable: false,
      enumerable: true,
      configurable: false,
    })

    return true
  }
}

export default Resource
