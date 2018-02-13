import { AnyObject } from 'rua-core/lib/Types'
import { CatchedFetchResult, FetchResult } from '../Type'

interface FetchStatic {
  fetch(url: string, options: AnyObject): Promise<FetchResult>

  catchedFetch(url: string, options: AnyObject): Promise<CatchedFetchResult>

  parseJSON(response): Promise<AnyObject>

  checkStatus(response): AnyObject | void
}

export default FetchStatic
