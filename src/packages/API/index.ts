import APIClass from './API'
import { packager } from 'rua-core/lib'

const apiInstance = <APIClass>packager.registerIfNotRegistered('rua-API', new API())

const API: any = apiInstance.call.bind(apiInstance)

// api.config = apiInstance.config
API.load = apiInstance.load.bind(apiInstance)
API.all = apiInstance.all.bind(apiInstance)
API.config = apiInstance.config.bind(apiInstance)

export {
  API,
}