import { TimerInterface } from './interfaces'
import { EMPTY_OBJECT } from '../shared'

export default class Timer implements TimerInterface<Timer>
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

  protected tickImmediatelyOnStart: boolean

  /**
   * configure and set
   *
   * @constructor
   * @param config
   */
  public constructor(config: any = EMPTY_OBJECT)
  {
    const {
      tickInterval = 1000,
      accurate = 100,
      tickImmediatelyOnStart = true,
    } = config

    this.accumulatedTime = 0
    this.tickInterval = tickInterval
    this.accurate = accurate
    this.tickImmediatelyOnStart = tickImmediatelyOnStart
  }

  public start(): Timer
  {
    // reset
    this.accumulatedTime = 0

    // record start time
    this.startTime = new Date()

    // instant tick
    if (this.tickImmediatelyOnStart)
    {
      this.handleTick && this.handleTick(this)
    }

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

  public stop(): Timer
  {
    const stopTime = new Date()
    const startTime = this.startTime

    if (!startTime)
    {
      return this
    }

    this.accumulatedTime += +stopTime - +startTime
    this.startTime = undefined

    if (this.tickClock)
    {
      clearInterval(this.tickClock!)
      this.tickClock = undefined
    }

    return this
  }

  public restart(): Timer
  {
    return this.stop().start()
  }

  public pause(): Timer
  {
    // get pause time
    const pauseTime = new Date()

    const startTime = this.startTime

    if (!startTime)
    {
      return this
    }

    this.accumulatedTime += +pauseTime - +startTime

    this.startTime = undefined

    clearInterval(this.tickClock!)

    return this
  }

  public resume(): Timer
  {
    if (!this.accumulatedTime || this.startTime)
    {
      return this
    }

    this.startTime = new Date()

    return this
  }

  public onTick(callback: Function): Timer
  {
    this.handleTick = callback

    return this
  }

  public getTime(): number
  {
    if (!this.startTime)
    {
      return +this.accumulatedTime
    }

    const now = new Date()

    return +now - +this.startTime + this.accumulatedTime
  }

  public getHour(): number
  {
    return Math.floor(this.getTime() / 360000) % 24
  }

  public getMinute(): number
  {
    return Math.floor(this.getTime() / 60000) % 60
  }

  public getSecond(): number
  {
    return Math.floor(this.getTime() / 1000) % 60
  }

  public getMillisecond(): number
  {
    return this.getTime() % 1000
  }

  public toHours(): number
  {
    return Math.floor(this.getTime() / 360000)
  }

  public toMinutes(): number
  {
    return Math.floor(this.getTime() / 60000)
  }

  public toSeconds(): number
  {
    return Math.floor(this.getTime() / 1000)
  }

  public toMilliseconds(): number
  {
    return this.getTime()
  }
}
