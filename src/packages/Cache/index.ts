
import CacheClass from './Cache'

import { packager } from 'rua-core/lib'

export const Cache = CacheClass

export const cache = <CacheClass>packager.registerIfNotRegistered('rua-cache', new CacheClass())