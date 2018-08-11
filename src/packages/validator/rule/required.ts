import { AnyData } from '../../core/type/data'

const required = (carry: boolean, data: AnyData) =>
{
  return carry && !!data
}

export default required
