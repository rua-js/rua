import { AnyData } from '../../type/data'
import * as _ from 'lodash'

const string = (carry: boolean, data: AnyData) =>
{
  return carry && _.isString(data)
}

export default string
