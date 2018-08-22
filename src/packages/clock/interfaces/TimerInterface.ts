export default interface TimerInterface
{
  start: Function
  stop: Function
  pause: Function
  resume: Function
  reset: Function
  onTick: Function
  getTime(): number
}
