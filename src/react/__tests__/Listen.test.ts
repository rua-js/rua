import Listen from '../decorator/Listen'
import Event from '../../event/Event'

describe('Listen Test', () =>
{
  test('init with componentDidMount case', () =>
  {
    const callbackFn = jest.fn()

    class A
    {
      @Listen('test')
      public B(...args: any[])
      {
        callbackFn(...args)
      }
    }

    // @ts-ignore
    new A().componentDidMount()

    Event.emit('test', 133, 244, 355)

    expect(callbackFn.mock.calls.length).toBe(1)
    expect(callbackFn.mock.calls[0].length).toBe(3)
    expect(callbackFn.mock.calls[0][0]).toBe(133)
    expect(callbackFn.mock.calls[0][1]).toBe(244)
    expect(callbackFn.mock.calls[0][2]).toBe(355)
  })

  test('destroy with componentWillUnmount case', () =>
  {
    const callbackFn = jest.fn()

    class A
    {
      @Listen('test')
      public B(...args: any[])
      {
        callbackFn(...args)
      }
    }

    // @ts-ignore
    new A().componentDidMount()
    // @ts-ignore
    new A().componentWillUnmount()

    Event.emit('test', 133, 244, 355)

    expect(callbackFn.mock.calls.length).toBe(0)
  })

  test('init with arrow function case', () =>
  {
    const callbackFn = jest.fn()

    class A
    {
      @Listen('test')
      public B = (...args: any[]) =>
      {
        callbackFn(...args)
      }
    }

    // @ts-ignore
    new A().componentDidMount()

    Event.emit('test', 133, 244, 355)

    expect(callbackFn.mock.calls.length).toBe(1)
    expect(callbackFn.mock.calls[0].length).toBe(3)
    expect(callbackFn.mock.calls[0][0]).toBe(133)
    expect(callbackFn.mock.calls[0][1]).toBe(244)
    expect(callbackFn.mock.calls[0][2]).toBe(355)
  })
})
