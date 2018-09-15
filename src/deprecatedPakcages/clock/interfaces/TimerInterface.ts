import Timable from './Timable'

export default interface TimerInterface<T> extends Timable
{
  start(): T

  stop(): T

  pause(): T

  resume(): T

  restart(): T

  onTick(callback: Function): T
}
