interface RequestConfiguration
{
  requestInterceptors?: {
    [name: string]: Function
  }

  responseInterceptors?: {
    [name: string]: Function
  }
}

export default RequestConfiguration
