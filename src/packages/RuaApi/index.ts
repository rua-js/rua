import RuaApiClass from './RuaApi'
import { packager } from 'rua-core/lib'
import { RuaApiInterface } from './Interface'

export const RuaApi = RuaApiClass

export const api = <RuaApiClass>packager.registerIfNotRegistered('rua-api', new RuaApiClass())
