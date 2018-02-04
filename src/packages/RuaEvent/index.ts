// Third-party Dependency

// Self Dependency
import RuaEvent from './RuaEvent'

// Rua Core Dependency
import { packager } from 'rua-core/lib'

// @ts-ignore: subclass
export const event: RuaEvent = packager.registerIfNotRegistered('rua-event', new RuaEvent())

