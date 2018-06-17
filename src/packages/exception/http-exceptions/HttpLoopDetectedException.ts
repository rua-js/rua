import { HttpException } from '../exceptions'

/**
 * HttpLoopDetectedException extends HttpException
 *
 * @class HttpLoopDetectedException
 */
class HttpLoopDetectedException extends HttpException {
  constructor() {
    super(508, 'Loop Detected')
  }
}

export default HttpLoopDetectedException
