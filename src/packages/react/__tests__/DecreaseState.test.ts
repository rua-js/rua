import DecreaseState from '../decorators/DecreaseState'

describe('React Decorator DecreaseState', () =>
{
  test('string parameter', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @DecreaseState('hehe')
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: -1,
    })
  })

  test('object parameter', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @DecreaseState({
        key: 'hehe',
      })
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: -1,
    })
  })

  test('object parameter with step', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @DecreaseState({
        key: 'hehe',
        step: 2,
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

  test('object parameter with full config', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @DecreaseState({
        key: 'hehe',
        step: 2,
        min: -10,
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

  test('object parameter with full config and hit min value', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @DecreaseState({
        key: 'hehe',
        step: 2,
        min: 0,
      })
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: 0,
    })
  })

  test('object parameter with full config and already below min value', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @DecreaseState({
        key: 'hehe',
        step: 2,
        min: 5,
      })
      public B: Function
    }

    new A().B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0].length).toBe(1)
    expect(setStateFn.mock.calls[0][0]({ hehe: 0 })).toEqual({
      hehe: 5,
    })
  })
})
