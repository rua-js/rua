import { ExceptionInterface } from './Interface'

/**
 * Exception extends Error
 *
 * @class Exception
 */
class Exception implements ExceptionInterface {

  /**
   * Exception name
   *
   * @type {string}
   */
  public name: string

  /**
   * Exception message
   *
   * @type {string}
   */
  public message: string

  /**
   * Exception stack
   *
   * @type {string}
   */
  public stack: string
  /**
   * Constructor
   *
   * @param {string} message
   */
  constructor(message: string = '') {

    this.name = this.constructor.name
    this.message = message
    this.stack = new Error().stack || ''
    // // dynamic name
    // Object.defineProperty(this, 'name', {
    //   configurable: true,
    //   enumerable: false,
    //   value: name,
    //   writable: true,
    // })
  }
}

export default Exception
