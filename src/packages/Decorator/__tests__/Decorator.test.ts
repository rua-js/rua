import { Decorator as D } from '../index'

describe('Decorator Test', () =>
{
  test('Instance', () =>
  {
    // Regular Case
    let t1 = 0

    @D.Instance()
    class Test
    {
      constructor()
      {
        t1 = 74110
      }
    }

    expect(t1).toBe(74110)

    // Value Case
    let t2 = 0
    @D.Instance(574110)
    class Test2
    {
      constructor(number: number)
      {
        t2 = number
      }
    }
    expect(t2).toBe(574110)
  })
})
