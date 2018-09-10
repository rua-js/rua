import Autowired from '../Autowired'

describe('Decorator Autowired Tests', () =>
{
  test('initialize', () =>
  {
    class A
    {
      @Autowired
      B: string
    }

    const a = new A().B

    expect(a instanceof String).toBe(true)
  })
})
