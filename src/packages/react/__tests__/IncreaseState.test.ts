import IncreaseState from '../decorators/IncreaseState'

describe('React Decorator ToggleState', () =>
{
  test('string parameter', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @IncreaseState('hehe')
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: 1,
    })
  })

  test('object parameter', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @IncreaseState({
        key: 'hehe',
      })
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: 1,
    })
  })

  test('object parameter with step', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @IncreaseState({
        key: 'hehe',
        step: 2,
      })
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: 2,
    })
  })

  test('object parameter with full config', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @IncreaseState({
        key: 'hehe',
        step: 2,
        max: 10,
      })
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: 2,
    })
  })

  test('object parameter with full config and hit max value', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @IncreaseState({
        key: 'hehe',
        step: 2,
        max: -2,
      })
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: -2,
    })
  })

  test('object parameter with full config and already surplus max value', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @IncreaseState({
        key: 'hehe',
        step: 2,
        max: -5,
      })
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: -5,
    })
  })
})
