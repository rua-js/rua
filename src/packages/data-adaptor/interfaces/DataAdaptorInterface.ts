import { AnyObject } from '../../type/data'

interface DataAdaptorInterface
{
  parse(origin: AnyObject): AnyObject
}

export default DataAdaptorInterface
