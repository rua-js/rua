import { Configuration as C } from '../'

const Configuration = new C

describe('Configuration Test', () =>
{
  test('.load, .get', () =>
  {
    // prepare
    Configuration.load({
      test: 1,
      t: {
        a: {
          b: 133,
        },
      },
    })

    // case: one level
    expect(Configuration.get('test')).toBe(1)
    expect(Configuration.get('t.a.b')).toBe(133)
  })
})
