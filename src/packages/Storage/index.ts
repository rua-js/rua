// Self Dependency
import Storage from './Storage'

// Rua Core Dependency
import { packager } from 'rua-core/lib'

// @ts-ignore
export const storage: Storage = packager.registerIfNotRegistered('rua-storage', new Storage())