import SetState from '../SetState'

describe('Decorator CallProp Tests', () =>
{
  test('1 parameter', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @SetState('hehe', 'haha')
      public B: any
    }

    const a = new A()
    a.B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0][0]).toEqual({
      hehe: 'haha',
    })
  })

  test('2 parameters', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @SetState({
        wo: 'de',
      })
      public B: any
    }

    const a = new A()
    a.B()

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0][0]).toEqual({ wo: 'de' })
    expect(setStateFn.mock.calls[0][1]).toBe(undefined)
  })

  test('projection', () =>
  {
    const setStateFn = jest.fn()

    class A
    {
      public setState = setStateFn

      @SetState(['wole', 'gequ', 'nide'])
      public B: any
    }

    const a = new A()
    a.B(133, 244, 355)

    expect(setStateFn.mock.calls.length).toBe(1)
    expect(setStateFn.mock.calls[0][0]).toEqual({ wole: 133, gequ: 244, nide: 355 })
  })
})
