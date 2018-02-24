
import Cache from './Cache'

import { packager } from 'rua-core/lib'

const cache = <Cache>packager.registerIfNotRegistered('rua-cache', new Cache())

export {
  cache,
}