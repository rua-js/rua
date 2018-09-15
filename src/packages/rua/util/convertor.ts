import { AnyObject } from '../../core/type/data'

export function JSON2FormData(json: AnyObject)
{
  const form = new FormData()

  for (const key in json)
  {
    form.append(key, json[key])
  }

  return form
}
