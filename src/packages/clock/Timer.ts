import { ObjectOf } from '../core/type/data'
import { TimerInterface } from './interfaces'
import { EMPTY_OBJECT } from '../shared'

class Timer implements TimerInterface
{
  /**
   * start time of this timer
   *
   * @type {Date | undefined}
   */
  protected startTime: Date | undefined

  protected accurate: number

  /**
   * accumulatedTime
   *
   * @type {number}
   */
  protected accumulatedTime: number

  /**
   * interval identity number
   *
   * @type {number | undefined}
   */
  protected tickClock: number | undefined

  /**
   * clock tick frequency
   *
   * @type {number}
   */
  protected tickInterval: number

  /**
   * timer status
   *
   * NOTE: stand-by <-> ticking <-> pausing
   *
   * @type {string}
   */
  protected status: string = 'stand-by'

  protected handleTick: Function | undefined

  /**
   * configure and set
   *
   * @constructor
   * @param config
   */
  public constructor(config: any = EMPTY_OBJECT)
  {
    const {
      tickInterval = 100,
      accurate = 100,
    } = config

    this.accumulatedTime = 0
    this.tickInterval = tickInterval
    this.accurate = accurate
  }

  public start()
  {
    // record start time
    this.startTime = new Date()

    // start ticking
    this.tickClock = setInterval(
      () =>
      {
        return this.handleTick && this.handleTick(this)
      },
      this.tickInterval,
    )

    return this
  }

  public stop()
  {
    const stopTime = new Date()
    const startTime = this.startTime

    if (!startTime)
    {
      return
    }

    this.accumulatedTime += +stopTime - +startTime
    this.startTime = undefined

    clearInterval(this.tickClock!)

    return this
  }

  public pause()
  {
    // get pause time
    const pauseTime = new Date()

    const startTime = this.startTime

    if (!startTime)
    {
      return
    }

    this.accumulatedTime += +pauseTime - +startTime

    this.startTime = undefined

    clearInterval(this.tickClock!)

    return this
  }

  public resume()
  {
    if (!this.accumulatedTime || this.startTime)
    {
      return
    }

    this.startTime = new Date()

    return this
  }

  public reset()
  {
    const tickClock = this.tickClock

    if (tickClock)
    {
      clearInterval(tickClock)
    }

    this.startTime = undefined
    this.accumulatedTime = 0

    return this
  }

  public onTick(callback: Function)
  {
    this.handleTick = callback

    return this
  }

  public getTime()
  {
    if (!this.startTime)
    {
      return +this.accumulatedTime
    }

    const now = new Date()

    return +now - +this.startTime + this.accumulatedTime
  }
}

export default Timer
