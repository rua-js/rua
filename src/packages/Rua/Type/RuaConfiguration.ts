import { ApiConfiguration } from '../../Api/Type'
import { Resources } from '../../Resource/Type'

interface RuaConfiguration
{
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

  resource?: Resources

  dva?: any
}

export default RuaConfiguration
