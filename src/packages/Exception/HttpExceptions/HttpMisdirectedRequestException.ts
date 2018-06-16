import { HttpException } from '../Exceptions'

/**
 * HttpMisdirectedRequestException extends HttpException
 *
 * @class HttpMisdirectedRequestException
 */
class HttpMisdirectedRequestException extends HttpException {
  constructor() {
    super(421, 'Misdirected request')
  }
}

export default HttpMisdirectedRequestException
