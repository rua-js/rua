interface RequestConfiguration
{
  requestInterceptors?: {
    [name: string]: Function,
  }

  responseInterceptors?: {
    [name: string]: Function,
  }

  defaultMethod?: string
}

export default RequestConfiguration
