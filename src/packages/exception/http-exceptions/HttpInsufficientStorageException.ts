import { HttpException } from '../exceptions'

/**
 * HttpInsufficientStorageException extends HttpException
 *
 * @class HttpInsufficientStorageException
 */
class HttpInsufficientStorageException extends HttpException {
  constructor() {
    super(507, 'Insufficient Storage')
  }
}

export default HttpInsufficientStorageException
