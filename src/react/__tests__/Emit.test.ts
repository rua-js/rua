import Event from '../../event/Event'
import Emit from '../decorators/Emit'

describe('Emit Test', () =>
{
  test('empty method case', () =>
  {
    const eventFn = jest.fn()

    Event.on('test', eventFn)

    class A
    {
      @Emit('test')
      public B: any
    }

    new A().B(133, 244)

    expect(eventFn.mock.calls.length).toBe(1)
    expect(eventFn.mock.calls[0].length).toBe(2)
    expect(eventFn.mock.calls[0][0]).toEqual(133)
    expect(eventFn.mock.calls[0][1]).toEqual(244)
  })

  test('function method case', () =>
  {
    const eventFn = jest.fn()

    Event.on('test', () => eventFn(133))

    class A
    {
      @Emit('test')
      public B()
      {
        eventFn(244)
      }
    }

    new A().B()

    expect(eventFn.mock.calls.length).toBe(2)
    expect(eventFn.mock.calls[0].length).toBe(1)
    expect(eventFn.mock.calls[1].length).toBe(1)
    expect(eventFn.mock.calls[0][0]).toEqual(133)
    expect(eventFn.mock.calls[1][0]).toEqual(244)
  })
})
