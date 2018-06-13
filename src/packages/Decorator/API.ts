import * as APIProperties from './API/index'
import { APIEntityObject } from '../API/Type/index'
import { API as APIEngine } from '../API'

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
