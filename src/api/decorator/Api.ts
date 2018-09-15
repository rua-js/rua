import { ApiEntityObject } from '../type/index'
import { ApiRequest } from '../index'
import { EMPTY_OBJECT } from '../../packages/rua/shared/index'

export default function Api(_class: any): any
{
  // if ('string' === typeof _class)
  // {
  //   return doApiRegistration(_class)
  // }

  let className

  if (!_class.className)
  {
    className = _class.name
  }
  else if ('string' === typeof _class.className)
  {
    className = _class.className
  }
  else if ('function' === typeof _class.className)
  {
    className = _class.className()
  }

  return doApiRegistration(className)(_class)
}

function doApiRegistration(name: string)
{
  return function (target: any): ApiEntityObject
  {
    new target()

    const apiObject = {
      [name]: target.prototype.__apiList || EMPTY_OBJECT,
    }

    ApiRequest.api.merge(apiObject)

    return <ApiEntityObject>apiObject
  }
}
