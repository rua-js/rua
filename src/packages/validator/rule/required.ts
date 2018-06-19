import { AnyData } from '../../type/data'

const required = (carry: boolean, data: AnyData) =>
{
  return carry && !!data
}

export default required
