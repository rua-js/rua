// Third-party Dependency

// Self Dependency
import Event from './Event'

// Rua Core Dependency
import { packager } from 'rua-core/lib'

// @ts-ignore: subclass
export const event: Event = packager.registerIfNotRegistered('rua-event', new Event())

