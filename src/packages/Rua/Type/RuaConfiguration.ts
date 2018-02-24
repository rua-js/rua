
interface RuaConfiguration {
  fetch?: {
    headers?: object
    extraHeaders?: object
    requestInterceptors?: Function[]
    responseInterceptors?: Function[]
    driver?: Function
  }

  [key: string]: any
}

export default RuaConfiguration