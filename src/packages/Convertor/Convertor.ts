import { AnyObject } from 'rua-core/lib/Types'

class Convertor
{
  public static Json2FormData(json: AnyObject)
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
