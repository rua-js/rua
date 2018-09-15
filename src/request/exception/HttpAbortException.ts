import { HttpException } from '../../exception/exceptions'

/**
 * HttpAbortException extends HttpException
 *
 * @class HttpAbortException
 */
export default class HttpAbortException extends HttpException
{
  constructor()
  {
    super(0, 'Abort')
  }
}
