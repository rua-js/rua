import RequestOptionsPassedToEngine from './RequestOptionsPassedToEngine'

type RequestEngine = (
  options: RequestOptionsPassedToEngine,
) => Promise<any>

export default RequestEngine
