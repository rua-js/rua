import { HttpException } from '../exceptions'

/**
 * HttpPayloadTooLargeException extends HttpException
 *
 * @class HttpPayloadTooLargeException
 */
class HttpPayloadTooLargeException extends HttpException {
  constructor() {
    super(413, 'Payload Too Large')
  }
}

export default HttpPayloadTooLargeException
