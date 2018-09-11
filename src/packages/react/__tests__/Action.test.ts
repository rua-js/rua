import Action from '../decorators/Action'

describe('Decorator Action Tests', () =>
{
  test('basic case', () =>
  {
    const dispatchFn = jest.fn()

    // @ts-ignore
    global.reduxStore = {
      dispatch: dispatchFn,
    }

    const action = 'fake/action'

    class A
    {
      @Action(action)
      public B: any
    }

    new A().B()

    expect(dispatchFn.mock.calls.length).toBe(1)
    expect(dispatchFn.mock.calls[0][0]).toEqual({
      type: action,
    })
  })

  test('double decorator case', () =>
  {
    const dispatchFn = jest.fn()

    // @ts-ignore
    global.reduxStore = {
      dispatch: dispatchFn,
    }

    const action = 'fake/action'
    const action2 = 'fake/action2'
    const action3 = 'fake/action3'

    class A
    {
      @Action(action)
      @Action(action2)
      @Action(action3)
      public B: any
    }

    new A().B()

    expect(dispatchFn.mock.calls.length).toBe(3)
    expect(dispatchFn.mock.calls[0][0]).toEqual({
      type: action,
    })
    expect(dispatchFn.mock.calls[1][0]).toEqual({
      type: action2,
    })
    expect(dispatchFn.mock.calls[2][0]).toEqual({
      type: action3,
    })
  })

  test('with payload case', () =>
  {
    const dispatchFn = jest.fn()

    // @ts-ignore
    global.reduxStore = {
      dispatch: dispatchFn,
    }

    const action = 'fake/action'
    const payload = 'fakePayload'

    class A
    {
      @Action(action, payload)
      public B: any
    }

    new A().B()

    expect(dispatchFn.mock.calls.length).toBe(1)
    expect(dispatchFn.mock.calls[0][0]).toEqual({
      payload,
      type: action,
    })
  })

  test('With extras', () =>
  {
    const dispatchFn = jest.fn()

    // @ts-ignore
    global.reduxStore = {
      dispatch: dispatchFn,
    }

    const action = 'fake/action'
    const payload = 'fakePayload'
    const extras = 'fakeExtras'

    class A
    {
      @Action(action, payload, extras)
      public B: any
    }

    new A().B()

    expect(dispatchFn.mock.calls.length).toBe(1)
    expect(dispatchFn.mock.calls[0][0]).toEqual({
      payload,
      extras,
      type: action,
    })
  })
})
