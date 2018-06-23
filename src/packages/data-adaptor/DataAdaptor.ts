import { DataAdaptorInterface } from './interfaces'
import { DataStructure } from './types'
import { AnyObject } from '../type/data'
import * as _ from 'lodash'

class DataAdaptor implements DataAdaptorInterface
{
  protected structure: DataStructure

  constructor(structure: DataStructure)
  {
    this.structure = structure
  }

  public parse(origin: AnyObject, structure: DataStructure = this.structure): AnyObject
  {
    const result: AnyObject = {}

    for (const key in structure)
    {
      const value = structure[key]

      if (_.isObject(value))
      {
        result[key] = this.parse(origin, value as AnyObject)
        continue
      }

      result[key] = _.get(origin, value as string)
    }

    return result
  }
}

export default DataAdaptor
