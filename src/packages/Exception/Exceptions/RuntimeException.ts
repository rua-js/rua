import Exception from '../Exception'
import { RuntimeExceptionInterface } from '../Interface'

/**
 * RuntimeException extends Exception
 *
 * @class RuntimeException
 */
class RuntimeException extends Exception implements RuntimeExceptionInterface {}

export default RuntimeException
