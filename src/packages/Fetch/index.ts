import Fetch from './Fetch'

import AnyObject from 'rua-core/lib/Types/AnyObject'

const fetch = (url: string, options: AnyObject = {}) => {
  return new Fetch(url, options).start()
}

export {
  fetch,
}
