import { factory } from '../index'

describe('Factory tests', () =>
{
  test('general', () =>
  {
    factory.define(
      'hehe',
      () =>
      {
        return {
          wo: 'de',
          le: 'qu',
        }
      },
      3,
    )

    expect(factory.has('hehe')).toBe(true)
    expect(factory.make('hehe')).toEqual([
      {
        wo: 'de',
        le: 'qu',
      },
      {
        wo: 'de',
        le: 'qu',
      },
      {
        wo: 'de',
        le: 'qu',
      },
    ])
  })
})
