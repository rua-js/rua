export default interface CountDownInterface<T>
{
  start(): T

  stop(): T

  pause(): T

  resume(): T

  restart(): T

  onTick(callback: Function): T

  onFinish(callback: Function): T

  getTime(): number

  getHour(): number

  getMinute(): number

  getSecond(): number

  getMillisecond(): number
}
