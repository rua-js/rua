import { CountDownInterface } from './interfaces'

export default class CountDown implements CountDownInterface<CountDown>
{
  protected startTime: number | undefined

  protected time: number

  protected elapseTime: number

  protected tickClock: number | undefined

  protected tickInterval: number

  protected endTimer: number | undefined

  protected handleTick: Function | undefined

  protected handleFinish: Function | undefined

  public constructor(config: any)
  {
    const {
      time,
      tickInterval = 1000,
    } = config

    this.time = +time
    this.tickInterval = tickInterval
    this.elapseTime = 0
  }

  public start(): CountDown
  {
    // record start time
    this.startTime = +new Date()
    this.elapseTime = 0

    // start ticking
    this.tickClock = setInterval(
      () =>
      {
        return this.handleTick && this.handleTick(this)
      },
      this.tickInterval,
    )

    // end time callback
    this.endTimer = setTimeout(
      () =>
      {
        if (this.tickClock)
        {
          clearInterval(this.tickClock)
          this.tickClock = undefined
        }

        return this.handleFinish && this.handleFinish(this)
      },
      this.time,
    )

    return this
  }

  public stop(): CountDown
  {
    if (this.tickClock)
    {
      clearInterval(this.tickClock)
      this.tickClock = undefined
    }

    if (this.endTimer)
    {
      clearTimeout(this.endTimer)
      this.endTimer = undefined
    }

    return this
  }

  public pause(): CountDown
  {
    console.error('Not Implemented yet')

    return this
  }

  public resume(): CountDown
  {
    console.error('Not Implemented yet')

    return this
  }

  public reset(): CountDown
  {
    return this
  }

  public restart(): CountDown
  {
    return this.stop().start()
  }

  public onTick(callback: Function): CountDown
  {
    this.handleTick = callback

    return this
  }

  public onFinish(callback: Function): CountDown
  {
    this.handleFinish = callback

    return this
  }

  public getTime(): number
  {
    // paused or stopped
    if (!this.startTime)
    {
      const time = this.time - this.elapseTime

      return time > 0 ? time : 0
    }

    const now = +new Date()
    const currentElapse = now - this.startTime

    const time = this.time - this.elapseTime - currentElapse

    return time > 0 ? time : 0
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
