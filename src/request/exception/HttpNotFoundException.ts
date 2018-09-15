import { HttpException } from '../../exception/exceptions'

/**
 * HttpNotFoundException extends HttpException
 *
 * @class HttpNotFoundException
 */
export default class HttpNotFoundException extends HttpException {
  constructor() {
    super(404, 'Not Found')
  }
}
