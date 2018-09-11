import Actions from '../Actions'

describe('Decorator Actions Tests', () =>
{
  test('Basic', () =>
  {
    const dispatchFn = jest.fn()

    // @ts-ignore
    global.reduxStore = {
      dispatch: dispatchFn,
    }

    const action = ['fake/action1', 'fake/action2', 'fake/action3']

    class A
    {
      @Actions(action)
      public B: any
    }

    new A().B()

    expect(dispatchFn.mock.calls.length).toBe(3)
    expect(dispatchFn.mock.calls[0][0]).toEqual({
      type: action[0],
    })
    expect(dispatchFn.mock.calls[1][0]).toEqual({
      type: action[1],
    })
    expect(dispatchFn.mock.calls[2][0]).toEqual({
      type: action[2],
    })
  })
})
