import Action from '../Action'

describe('Decorator Action Tests', () =>
{
  test('Basic', () =>
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

  test('With payload', () =>
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
