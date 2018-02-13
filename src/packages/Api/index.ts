import Api from './Api'
import { packager } from 'rua-core/lib'

const apiInstance = <Api>packager.registerIfNotRegistered('rua-api', new Api())

const api: any = apiInstance.call.bind(apiInstance)

// api.config = apiInstance.config
api.load = apiInstance.load.bind(apiInstance)
api.all = apiInstance.all.bind(apiInstance)

export {
  Api,
  api,
}