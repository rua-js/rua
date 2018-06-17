import * as request from 'superagent'
import { RequestOptionsPassedToEngine } from '../type'
import {
  HttpAbortException,
  HttpRequestTimeoutException,
  HttpNotFoundException,
} from '../../exception'

export default function superAgentEngine(options: RequestOptionsPassedToEngine): Promise<any>
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
  } = options

  let req = request(method, url)
    .set(headers)

  type && (req = req.type(type))
  query && (req = req.query(query))
  accept && (req = req.accept(accept))
  withCredentials && (req = req.withCredentials())
  timeout && (req = req.timeout(timeout))
  retry && (req = req.retry(retry, <any>retryCallback))

  before && before(req)

  return req.catch((err: Error) => {
    if (err.message.includes('Timeout')) {
      throw new HttpRequestTimeoutException()
    }

    if (err.message = 'Not Found') {
      throw new HttpNotFoundException()
    }
    throw err
  })
}
