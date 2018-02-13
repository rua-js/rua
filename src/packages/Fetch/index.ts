import Fetch from './Fetch'

import AnyObject from 'rua-core/lib/Types/AnyObject'

export const fetch = (url: string, options: AnyObject = {}) => {
  return new Fetch(url, options).start()
}
