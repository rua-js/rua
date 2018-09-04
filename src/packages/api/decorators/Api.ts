import { APIEntityObject } from '../type/index'
import { ApiRequest } from '../'

export default function Api(...args: any[])
{
  if (args.length === 1)
  {
    return doApiRegistration(args[0])
  }

  return doApiRegistration
}

function doApiRegistration(target: any): APIEntityObject
{
  new target()

  const entityObject = {
    [target.name.toLowerCase()]: target.prototype.__apiList,
  }

  ApiRequest.api.merge(entityObject)

  return <APIEntityObject>entityObject
}
