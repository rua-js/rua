import * as APIProperties from './api/index'
import { APIEntityObject } from '../api/type/index'
import { API as APIEngine } from '../api'

const API: any = () => (target: any): APIEntityObject =>
{
  const entityObject = {
    [target.name.toLowerCase()]: new target(),
  }

  APIEngine.merge(entityObject)

  return <APIEntityObject>entityObject
}

Object.assign(API, APIProperties)

export default API
