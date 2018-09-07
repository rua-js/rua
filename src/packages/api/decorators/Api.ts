import { APIEntityObject } from '../type/index'
import { ApiRequest } from '../'
import { EMPTY_OBJECT } from '../../shared'

export default function Api(classOrName: any)
{
  if ('string' === typeof classOrName)
  {
    return doApiRegistration(classOrName)
  }

  return doApiRegistration(classOrName.name.toLowerCase())(classOrName)
}

function doApiRegistration(name: string)
{
  return function (target: any): APIEntityObject
  {
    new target()

    const apiObject = {
      [name]: target.prototype.__apiList || EMPTY_OBJECT,
    }

    ApiRequest.api.merge(apiObject)

    return <APIEntityObject>apiObject
  }
}
