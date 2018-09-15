import ToggleState from '../decorators/ToggleState'

describe('React Decorator ToggleState', () =>
{
  test('set true', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @ToggleState('hehe')
      public B: any
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({})).toEqual({
      hehe: true,
    })
  })

  test('set false', () => {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @ToggleState('hehe')
      public B: any
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: true })).toEqual({
      hehe: false,
    })
  })
})
