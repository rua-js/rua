import * as APIProperties from './api/index'
import { APIEntityObject } from '../api/type/index'
import { ApiRequest } from '../api'

const API: any = () => (target: any): APIEntityObject =>
{
  const entityObject = {
    [target.name.toLowerCase()]: new target(),
  }

  ApiRequest.api.merge(entityObject)

  return <APIEntityObject>entityObject
}

Object.assign(API, APIProperties)

export default API
