import { APIEntityObject } from '../type/index'
import { ApiRequest } from '../'
import { EMPTY_OBJECT } from '../../shared'

export default function Api(_class: any)
{
  // if ('string' === typeof _class)
  // {
  //   return doApiRegistration(_class)
  // }

  let namespace

  if (!_class.getName)
  {
    namespace = _class.name.toLowerCase()
  }
  else if ('string' === typeof _class.getName)
  {
    namespace = _class.getName
  }
  else if ('function' === typeof _class.getName)
  {
    namespace = _class.getName()
  }

  return doApiRegistration(namespace)(_class)
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
