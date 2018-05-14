import Request from './Request'

import AnyObject from 'rua-core/lib/Types/AnyObject'

const request = (url: string, options: AnyObject = {}) => {
  return new Request(url, options).start()
}

export {
  request,
}
