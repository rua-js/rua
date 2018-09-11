import HOF from '../HOF'

describe('Decorator HOF Test', () =>
{
  test('basic case', () =>
  {
    const bFn = jest.fn()

    class A
    {
      @HOF
      public B(n: number, n2: number)
      {
        return bFn(n, n2)
      }
    }

    // @ts-ignore
    new A().B(133, 244)()

    // expect(hof instanceof Function).toBe(true)
    expect(bFn.mock.calls.length).toBe(1)
    expect(bFn.mock.calls[0].length).toBe(2)
    expect(bFn.mock.calls[0][0]).toBe(133)
    expect(bFn.mock.calls[0][1]).toBe(244)
  })
})
