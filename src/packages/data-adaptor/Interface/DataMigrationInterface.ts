import AnyObject from '../../type/data/AnyObject'

interface DataMigrationInterface
{
  parse(origin: AnyObject): AnyObject
}

export default DataMigrationInterface
