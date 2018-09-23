// Third-party dependency
import { dva, dvaLite } from '../../dva_bk'
// type
import { AnyObject } from 'rua-core/lib/Types'
import { CanConfig } from 'rua-core/lib/Contracts'

// Constants
const dvaVersion: AnyObject = {
  lite: dvaLite,
  reactRouter: dva,
}

// bridge
const ruaDva: CanConfig = {
  config(configuration: any)
  {
    const {
      version = 'lite',
      ...restConfiguration
    } = configuration

    return dvaVersion[version](restConfiguration)
  },
}

export default ruaDva

