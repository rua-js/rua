import { AnyObject } from 'rua-core/lib/Types'
import * as _ from 'lodash'

const Array2Object = (arr: any[]): AnyObject => {
  const out: any = {}
  for (const key in arr) {
    out[key] = arr[key]
  }
  return out
}

export default Array2Object
