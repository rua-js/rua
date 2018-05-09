import { ApiConfiguration } from '../../Api/Type'

interface RuaConfiguration {
  fetch?: {
    headers?: object
    extraHeaders?: object
    requestInterceptors?: Function[]
    responseInterceptors?: Function[]
    driver?: Function
  }

  api?: {
    [key: string]: ApiConfiguration
  }

  models?: {
    [key: string]: any
  }
}

export default RuaConfiguration
