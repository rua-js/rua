import { APIRequest } from '../index'
// import { fetch } from '../../Fetch'
jest.setTimeout(20 * 1000)
import { factory } from '../../factory'

describe('api Tests', () =>
{
  test('usage', async () =>
  {
    // Regular Case
    APIRequest.api.load({
      test: {
        go: {
          url: 'https://reqres.in/api/users',
          method: 'GET',
        },
      },

    })

    APIRequest.api.merge({
      test2: {
        str: 'https://reqres.in/api/users',
      },
    })

    await expect(new APIRequest('test.go')).resolves.toBeInstanceOf(Object)
    await expect(new APIRequest('test.go')).resolves.toHaveProperty('page')

    // String Case
    await expect(new APIRequest('test2.str')).resolves.toBeInstanceOf(Object)
    await expect(new APIRequest('test2.str')).resolves.toHaveProperty('page')
  })

  test('factory', async () =>
  {
    const fake = {
      wo: 'de',
      ge: 'a',
    }

    factory.define(
      'wode.ge',
      () => fake,
      1,
    )

    await expect(new APIRequest('wode.ge')).resolves.toEqual([fake])
  })
})
