import { API } from '../index'
// import { fetch } from '../../Fetch'
jest.setTimeout(10000)

describe('api Tests', () =>
{
  test('usage', async () =>
  {
    // Regular Case
    API.load({
      test: {
        go: {
          url: 'https://reqres.in/api/users',
          method: 'GET',
        },
      },

    })

    API.merge({
      test2: {
        str: 'https://reqres.in/api/users',
      },
    })

    await expect(API('test.go')).resolves.toBeInstanceOf(Object)
    await expect(API('test.go')).resolves.toHaveProperty('page')

    // String Case
    await expect(API('test2.str')).resolves.toBeInstanceOf(Object)
    await expect(API('test2.str')).resolves.toHaveProperty('page')
  })
})
