import { API } from '../index'
// import { fetch } from '../../Fetch'

describe('API Tests', () =>
{
  test('usage', async () =>
  {
    // Regular Case
    API.load({
      test: {
        go: {
          url: 'https://reqres.in/API/users',
          method: 'GET',
        },
        str: 'https://reqres.in/API/users',
      },
    })

    await expect(API('test.go')).resolves.toBeInstanceOf(Object)
    await expect(API('test.go')).resolves.toHaveProperty('page')

    // String Case
    await expect(API('test.str')).resolves.toBeInstanceOf(Object)
    await expect(API('test.str')).resolves.toHaveProperty('page')
  })
})
