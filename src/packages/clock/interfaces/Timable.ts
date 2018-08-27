export default interface Timable
{
  getTime(): number

  getHour(): number

  getMinute(): number

  getSecond(): number

  getMillisecond(): number

  toHours(): number

  toMinutes(): number

  toSeconds(): number

  toMilliseconds(): number
}
