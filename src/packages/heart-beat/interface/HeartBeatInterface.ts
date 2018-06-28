interface HeartBeatInterface
{
  setBeatRate(rate: number): void
  getBeatRate(): number
  pauseBeat(): void
  resumeBeat(): void
  forceBeat(): void
  forceNextBeat(): void
  skipNextBeat(): void
  skipNextNBeats(): void
  onBeat(): void
  onNthBeat(): void
  onNBeats(n: number): void
  onNextBeat(): void
  onNextNthBeat(n: number): void
}

export default HeartBeatInterface
