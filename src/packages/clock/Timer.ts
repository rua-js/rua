import { FunctionObject } from '../type/data'

class Timer
{
  protected hooks: FunctionObject

  protected startTime: Date | undefined

  protected accurate: number

  protected accumulated: number

  protected tickClock: number | undefined

  protected tickInterval: number

  public constructor(config: any)
  {
    const {
      hooks,
    } = config

    this.accumulated = 0
    this.tickInterval = 100
    this.accurate = 100
    this.hooks = hooks
  }

  public start()
  {
    this.startTime = new Date()
    this.tickClock = setInterval(
      () =>
      {
        this.onTick()
      },
      this.tickInterval,
    )
  }

  public stop()
  {
    const startTime = this.startTime

    if (!startTime)
    {
      return
    }

    const stopTime = new Date()

    this.accumulated += +stopTime - +startTime

    clearInterval(this.tickClock!)
  }

  public pause()
  {
    const startTime = this.startTime

    if (!startTime)
    {
      return
    }

    const pauseTime = new Date()

    this.accumulated += +pauseTime - +startTime

    this.startTime = undefined

    clearInterval(this.tickClock!)
  }

  public resume()
  {
    if (!this.accumulated || this.startTime)
    {
      return
    }

    this.startTime = new Date()
  }

  public onTick()
  {

  }
}

export default Timer
