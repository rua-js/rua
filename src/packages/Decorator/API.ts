import * as APIProperties from './API/index'
import { APIEntityObject } from '../API/Type/index'
import { API as APIEngine } from '../API'

const API: any = (namespace: string) => (target: any): APIEntityObject =>
{
  APIEngine.merge({
    [namespace]: new target(),
  })

  return target
}

Object.assign(API, APIProperties)

export default API
