import AnyData from '../../type/data/AnyData'

const required = (carry: boolean, data: AnyData) =>
{
  return carry && !!data
}

export default required
