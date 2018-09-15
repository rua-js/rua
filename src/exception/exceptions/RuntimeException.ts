import Exception from '../Exception'
import { RuntimeExceptionInterface } from '../interface'

/**
 * RuntimeException extends exception
 *
 * @class RuntimeException
 */
class RuntimeException extends Exception implements RuntimeExceptionInterface {}

export default RuntimeException
