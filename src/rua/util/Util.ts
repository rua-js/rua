import * as invariant from 'invariant'
import { ObjectOf } from '../type/data'
// @ts-ignore
// import * as global from 'global'

class Util
{
  public static invariant = invariant

  public static get language()
  {
    // @ts-ignore: fix IE language
    return global && global.navigator && (global.navigator.language || global.navigator.browserLanguage)
  }

  public static delay(time: number): Promise<void>
  {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  public static getObjectValueByPath(object: ObjectOf<any>, path: string, delimiter: string = '.')
  {
    let returnValue = object

    for (const key of path.split(delimiter))
    {
      returnValue = returnValue[key]
    }

    return returnValue
  }
}

export default Util
