import { API } from '../index'
// import { fetch } from '../../Fetch'

describe('API Tests', () =>
{
  test('usage', async () =>
  {
    // prep: load API
    API.load({
      test: {
        go: {
          url: 'https://reqres.in/API/users',
          method: 'GET',
        },
      }
    })

    // case: success
    await expect(
      API('test.go')
    ).resolves.toBeInstanceOf(Object)

    // case: correct data
    await expect(
      API('test.go')
    ).resolves.toHaveProperty('page')
  })
})