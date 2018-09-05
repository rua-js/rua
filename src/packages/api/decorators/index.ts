import Api from './Api'
import Method from './Method'
import Body from './Body'
import Jwt from './Jwt'
import { POST, DELETE, GET, PATCH, PUT } from './Methods'

Object.assign(Api, {
  GET,
  POST,
  DELETE,
  PATCH,
  PUT,
  Method,
  Body,
  Jwt,
})

export default Api as any