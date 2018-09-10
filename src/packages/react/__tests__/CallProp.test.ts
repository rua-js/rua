import CallProp from '../CallProp'
import CallPropHOF from '../CallPropHOF'

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

  test('Higher Order', () =>
  {
    const propFn = jest.fn()

    class A
    {
      public props = {
        hehe: propFn,
      }

      @CallPropHOF('hehe')
      public B: any
    }

    const a = new A()
    a.B()()

    expect(propFn.mock.calls.length).toBe(1)
  })
})
