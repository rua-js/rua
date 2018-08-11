import { AnyObject } from '../../core/type/data'

interface DataAdaptorInterface
{
  parse(origin: AnyObject): AnyObject
}

export default DataAdaptorInterface
