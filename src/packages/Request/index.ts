import Request from './Request'

import AnyObject from 'rua-core/lib/Types/AnyObject'

const request: any = (url: string, options: AnyObject = {}) => {
  return new Request(url, options).start()
}

request.config = Request.config.bind(Request)

export {
  request,
}
