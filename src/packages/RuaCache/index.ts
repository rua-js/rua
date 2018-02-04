
import RuaCacheClass from './RuaCache'

import { packager } from 'rua-core/lib'

export const RuaCache = RuaCacheClass

export const cache = <RuaCacheClass>packager.registerIfNotRegistered('rua-cache', new RuaCacheClass())