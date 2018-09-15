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

  test('wrapper', () =>
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
      1,
      (data: any) =>
      {
        return {
          data,
        }
      },
    )

    expect(factory.has('hehe')).toBe(true)
    expect(factory.make('hehe')).toEqual({
      data: [
        {
          wo: 'de',
          le: 'qu',
        },
      ],
    })
  })
})
