import { Timer } from '../index'

describe('Timer Tests', () =>
{
  test('.start, .stop', async () =>
  {
    const timer = new Timer()

    // Correct Value Case
    timer.start()
    await new Promise(resolve => setTimeout(resolve, 2000))
    timer.stop()
    expect(timer.getTime() > 2000).toBe(true)
  })

  test('.pause, .resume', () =>
  {
    const timer = new Timer()

  })

  test('.onTick', async () =>
  {
    const timer = new Timer()
    const callbackMock = jest.fn()

    timer.onTick(callbackMock).start()
    await new Promise(resolve => setTimeout(resolve, 2000))
    timer.stop()
    expect(callbackMock.mock.calls.length >= 19).toBe(true)
  })

  test('.getTime', async () =>
  {
    const timer = new Timer()

    timer.start()
    await new Promise(resolve => setTimeout(resolve, 2000))
    timer.stop()
    expect(timer.getTime() > 2000 && timer.getTime() < 2100).toBe(true)
  })
})
