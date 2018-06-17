import AnyData from '../../type/data/AnyData'
import * as _ from 'lodash'

const nullable = (carry: boolean, data: AnyData) =>
{
  if (_.isNil(data))
  {
    return true
  }

  return carry
}

export default nullable
