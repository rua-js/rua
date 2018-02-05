import { AnyObject } from 'rua-core/lib/Types'
import * as _ from 'lodash'

const Object2Array = (object: AnyObject): any[] => {
  return _.values(object)
}

export default Object2Array
