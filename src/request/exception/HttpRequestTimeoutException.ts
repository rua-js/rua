import { HttpException } from '../../exception/exceptions'

/**
 * HttpRequestTimeoutException extends HttpException
 *
 * @class HttpRequestTimeoutException
 */
export default class HttpRequestTimeoutException extends HttpException {
  constructor() {
    super(408, 'Request Timeout')
  }
}
