import { HttpException } from '../exceptions'

/**
 * HttpFailedDependencyException extends HttpException
 *
 * @class HttpFailedDependencyException
 */
class HttpFailedDependencyException extends HttpException {
  constructor() {
    super(424, 'Failed Dependency')
  }
}

export default HttpFailedDependencyException
