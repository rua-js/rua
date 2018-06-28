import { warn, invariant } from '../util'

/**
 * I have no idea how to test these utilities
 */
describe('API util tests', () =>
{
  test('warn', () =>
  {
    expect(
      warn('no way'),
    ).toBeUndefined()
  })

  test('invariant', () =>
  {
    expect(
      invariant(true, 'oh?'),
    ).toBeUndefined()
  })
})
