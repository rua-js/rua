import { AnyData } from '../../core/type/data'
import * as _ from 'lodash'

const integer = (carry: boolean, data: AnyData) =>
{
  return carry && _.isInteger(data)
}

export default integer
