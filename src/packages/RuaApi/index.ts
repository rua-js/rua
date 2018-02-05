import RuaApiClass from './RuaApi'
import { packager } from 'rua-core/lib'
import { RuaApiInterface } from './Interface'

const instance = <RuaApiClass>packager.registerIfNotRegistered('rua-api', new RuaApiClass())

export const RuaApi = RuaApiClass

export const api = instance.dispatch
