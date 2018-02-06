import RuaFetch from './RuaFetch'

import AnyObject from 'rua-core/lib/Types/AnyObject'

export const fetch = (url: string, options: AnyObject = {}) => {
  return new RuaFetch(url, options).start()
}
