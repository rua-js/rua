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
})
