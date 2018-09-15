import { ResponseData, RequestOptionsPassedToEngine } from '../type'
import { fetch as _fetch } from '../third-party'

export default function fetchEngine(
  options: RequestOptionsPassedToEngine,
): Promise<ResponseData>
{
  return new Promise<ResponseData>(() => {})
}
