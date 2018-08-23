export default interface TimerInterface<T>
{
  start(): T

  stop(): T

  pause(): T

  resume(): T

  restart(): T

  onTick(callback: Function): T

  getTime(): number

  getHour(): number

  getMinute(): number

  getSecond(): number

  getMillisecond(): number
}
