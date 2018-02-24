// Self Dependency
import Storage from './Storage'

// Rua Core Dependency
import { packager } from 'rua-core/lib'

// @ts-ignore
const storage: Storage = packager.registerIfNotRegistered('rua-storage', new Storage())

export {
  storage,
}