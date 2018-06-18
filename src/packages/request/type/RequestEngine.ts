import RequestOptionsPassedToEngine from './RequestOptionsPassedToEngine'
import ResponseData from './ResponseData'

type RequestEngine = (
  options: RequestOptionsPassedToEngine,
) => Promise<ResponseData>

export default RequestEngine
