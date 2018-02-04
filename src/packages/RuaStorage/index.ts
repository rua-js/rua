// Self Dependency
import RuaStorage from './RuaStorage'

// Rua Core Dependency
import { packager } from 'rua-core/lib'

// @ts-ignore
export const storage: RuaStorage = packager.registerIfNotRegistered('rua-storage', new RuaStorage())