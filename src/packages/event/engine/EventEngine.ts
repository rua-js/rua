// @ts-ignore: import problem
import * as EventEmitter from 'wolfy87-eventemitter'
import { MultiEvents } from '../type'
import { AnyObject } from 'rua-core/lib/Types'
import { EventInterface } from '../interface'

export default class EventEngine implements EventInterface
{

  /**
   * event instance
   *
   * @type {EventEmitter}
   */
  public eventEngine = new EventEmitter()

  /**
   * Adds a listener function to the specified event.
   *
   * @param {string | RegExp} event
   * @param {Function} callback
   * @returns {Event}
   */
  public on = (event: string | RegExp, callback: Function): EventEngine =>
  {
    // @ts-ignore: no error here
    this.eventEngine.on(event, callback)

    return this
  }

  /**
   * Adds a once listener function to the specified event.
   * It will be automatically removed after its first execution.
   *
   * @param {string | RegExp} event
   * @param {Function} callback
   * @returns {Event}
   */
  public once = (event: string | RegExp, callback: Function): EventEngine =>
  {
    // @ts-ignore: no error here
    this.eventEngine.once(event, callback)

    return this
  }

  /**
   * Emits an event of your choice.
   *
   * @param {string | RegExp} event
   * @param args
   * @returns {Event}
   */
  public emit = (event: string | RegExp, ...args: any[]): EventEngine =>
  {
    // @ts-ignore: no error here
    this.eventEngine.emit(event, args)

    return this
  }

  /**
   * Removes a listener function from the specified event.
   *
   * @param {string | RegExp} event
   * @param {Function} callback
   * @returns {Event}
   */
  public remove = (event: string | RegExp, callback: Function): EventEngine =>
  {
    // @ts-ignore: no error here
    this.eventEngine.removeListener(event, callback)

    return this
  }

  /**
   * Removes all listeners.
   *
   * @returns {Event}
   */
  public clear = (): EventEngine =>
  {
    this.eventEngine.removeAllListeners()

    return this
  }

  /**
   * Returns the listener array for the specified event. (if string is given)
   * Returns listeners object for the specified event. (if RegExp is given)
   *
   * @param {string | RegExp} event
   * @returns {AnyObject | Function[]}
   */
  public get = (event: string | RegExp): AnyObject | Function[] =>
  {
    // @ts-ignore: no error here
    return this.eventEngine.getListeners(event)
  }

  /**
   * Gets all listeners.
   *
   * @returns {AnyObject}
   */
  public all = (): AnyObject =>
  {
    return this.get(/./)
  }

  /**
   * Load event listener from a event object
   *
   * @param {MultipleEvents} events
   * @returns {Event}
   */
  public load(events: MultiEvents): EventEngine
  {
    this.eventEngine.addListeners(events)

    return this
  }
}
