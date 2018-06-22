import * as request from 'superagent'
import { JSON2FormData } from '../../utility/convertor'
import { RequestOptionsPassedToEngine, ResponseData } from '../type'
import {
  HttpRequestTimeoutException,
  HttpNotFoundException,
  HttpException,
} from '../../exception'

export default function superAgentEngine(
  options: RequestOptionsPassedToEngine,
): Promise<ResponseData>
{
  const {
    url,
    headers,
    method,
    query,
    type,
    accept,
    withCredentials,
    timeout,
    retry,
    retryCallback,
    before,
    after,
    form,
    body,
  } = options

  let req = request(method, url.toString())
    .set(headers.getHeaders())

  if (form)
  {
    req = req.field(body.toObject())
  } else
  {
    req = req.send(body.toObject())
  }

  type && (req = req.type(type))
  query && (req = req.query(query))
  accept && (req = req.accept(accept))
  withCredentials && (req = req.withCredentials())
  timeout && (req = req.timeout(timeout))
  retry && (req = req.retry(retry, <any>retryCallback))

  before && before(req)

  return req
    .then(response => after(response))
    .then((response) => // check status
    {
      if (response.status >= 200 && response.status < 300)
      {
        return response
      }

      const err: any = new HttpException(response.status, response.type)

      err.response = response

      throw err
      // return res
    })
    .then(response => response.body) // keep body
    .catch((err: Error) =>
    {
      if (err.message.includes('Timeout'))
      {
        throw new HttpRequestTimeoutException()
      }

      if (err.message = 'Not Found')
      {
        throw new HttpNotFoundException()
      }

      throw err
    })
}
