import AnyData from '../../Type/Data/AnyData'

const required = (carry: boolean, data: AnyData) =>
{
  return carry && !!data
}

export default required
