import * as APIProperties from './API/index'
import { APIEntityObjectCollection } from '../API/Type/index'

const API: any = (target: any): APIEntityObjectCollection =>
{
  return new target()
}

Object.assign(API, APIProperties)

export default API
