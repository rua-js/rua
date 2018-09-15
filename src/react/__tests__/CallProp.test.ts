import CallProp from '../decorator/CallProp'

describe('React Decorator CallProp', () =>
{
  test('Basic', () =>
  {
    const propFn = jest.fn()

    class A
    {
      public props = {
        hehe: propFn,
      }

      @CallProp('hehe')
      public B: any
    }

    const a = new A()
    a.B()

    expect(propFn.mock.calls.length).toBe(1)
  })
})
