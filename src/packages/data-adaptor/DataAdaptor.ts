import * as _ from 'lodash'
import { AnyObject } from '../type/data'
import { DataAdaptorInterface } from './interfaces'
import { DataStructure } from './types'

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

      if (!(value as string).includes('['))
      {
        result[key] = _.get(origin, value as string)
      }

      result[key] = origin[key]
    }

    return result
  }
}

export default DataAdaptor
