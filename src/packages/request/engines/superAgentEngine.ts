import * as request from 'superagent'
import { RequestOptionsPassedToEngine } from '../type'

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
  } = options

  let req = request(method, url)
    .set(headers.getHeaders())

  type && (req = req.type(type))
  query && (req = req.query(query))
  accept && (req = req.accept(accept))
  withCredentials && (req = req.withCredentials())
  timeout && (req = req.timeout(timeout))
  retry && (req = req.retry(retry, <any>retryCallback))

  return req
}
