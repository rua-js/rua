import { AnyObject } from 'rua-core/lib/Types'
import { CatchedRequestResult, RequestResult } from '../Type'

interface RequestStatic {
  request(url: string, options: AnyObject): Promise<RequestResult>

  catchedRequest(url: string, options: AnyObject): Promise<CatchedRequestResult>

  parseJSON(response): Promise<AnyObject>

  checkStatus(response): AnyObject | void
}

export default RequestStatic
