import { AnyObject } from '../type/data'

class Convertor
{
  public static JSON2FormData(json: AnyObject)
  {
    const form = new FormData()

    for (const key in json)
    {
      form.append(key, json[key])
    }

    return form
  }
}

export default Convertor
