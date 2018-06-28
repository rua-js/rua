import { factory } from '../../factory'
import Factory from '../../factory/Factory'
import { RepositoryLite } from '../../repository'
import { APIRequest } from '../index'
// import { fetch } from '../../Fetch'
jest.setTimeout(20 * 1000)

describe('api Tests', () =>
{
  test('load object api', async () =>
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

    await expect(new APIRequest('test.go')).resolves.toBeInstanceOf(Object)
    await expect(new APIRequest('test.go')).resolves.toHaveProperty('page')
  })

  test('merge string api', async () =>
  {

    APIRequest.api.merge({
      test2: {
        str: 'https://reqres.in/api/users',
      },
    })

    await expect(new APIRequest('test2.str')).resolves.toBeInstanceOf(Object)
    await expect(new APIRequest('test2.str')).resolves.toHaveProperty('page')
  })

  test('empty config', () =>
  {
    APIRequest.config()
    APIRequest.api.clear()

    // Default API
    expect(APIRequest.api).toBeInstanceOf(RepositoryLite)
    expect(APIRequest.api.all()).toEqual({})

    // Default useFactoryOnProduction
    expect(APIRequest.defaults.useFactoryOnProduction).toBe(false)

    // Default Factory
    expect(APIRequest.defaults.factory).toBeInstanceOf(Factory)

  })

  test('full config', () =>
  {
    // Load Config
    const api = {
      namespace: {
        url: '123',
      },
    }

    const fakeFactory = {}

    APIRequest.config({
      data: api,
      useFactoryOnProduction: true,
      factory: fakeFactory,
    })

    expect(api).toBe(api)
    expect(APIRequest.defaults.factory).toBe(fakeFactory)
    expect(APIRequest.defaults.useFactoryOnProduction).toBe(true)
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
