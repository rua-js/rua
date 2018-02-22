import { HttpException } from '../Exceptions'

/**
 * HttpMisdirectedRequestException extends HttpException
 *
 * @class HttpMisdirectedRequestException
 */
class HttpMisdirectedRequestException extends HttpException {
  constructor() {
    super(409, 'Misdirected Request')
  }
}

export default HttpMisdirectedRequestException
