import { ExceptionInterface } from './Interface'

/**
 * Exception extends Error
 *
 * @class Exception
 */
class Exception extends Error implements ExceptionInterface {

  /**
   * Constructor
   *
   * @param {string} message
   */
  constructor(message?: string) {
    super(message)

    // dynamic name
    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    })
  }
}

export default Exception
