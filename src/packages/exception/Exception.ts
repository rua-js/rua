import { ExceptionInterface } from './interface'

/**
 * exception extends Error
 *
 * @class Exception
 */
class Exception implements ExceptionInterface {

  /**
   * exception name
   *
   * @type {string}
   */
  public name: string

  /**
   * exception message
   *
   * @type {string}
   */
  public message: string

  /**
   * exception stack
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
