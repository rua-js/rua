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

      // use recursive method to build object inside object
      if (_.isObject(value))
      {
        result[key] = this.parse(origin, value as AnyObject)
        continue
      }

      // use _.get() only when possible array is present to improve performance
      if ((value as string).includes('['))
      {
        result[key] = _.get(origin, value as string)
        continue
      }

      // use loop to find object value
      if ((value as string).includes('.'))
      {
        let resultValue = origin
        const arrayedPath = (value as string).split('.')
        for (const path of arrayedPath)
        {
          resultValue = resultValue[path]
          if (!resultValue)
          {
            break
          }
        }
        result[key] = resultValue
        continue
      }

      result[key] = origin[key]
    }

    return result
  }
}

export default DataAdaptor
