// Self Dependency
import Rua from './Rua'

// Rua Core Dependency
import { packager } from 'rua-core/lib'

// @ts-ignore: subclass
const rua: Rua = packager.registerIfNotRegistered('rua', new Rua())

export {
  rua,
}

