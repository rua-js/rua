import { ApiConfiguration } from '../../Api/Type'

interface RuaConfiguration {
  fetch?: {
    headers?: object
    extraHeaders?: object
    requestInterceptors?: Function[]
    responseInterceptors?: Function[]
    driver?: Function
  }

  api?: ApiConfiguration
}

export default RuaConfiguration
