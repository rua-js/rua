import { factory } from '../factory'
import Factory from '../factory/Factory'
import { RepositoryLite } from '../../repository'
import { ApiRequest } from '../index'
// import { fetch } from '../../Fetch'
jest.setTimeout(20 * 1000)

describe('api Tests', () =>
{
  test('load object api', async () =>
  {
    // Regular Case
    ApiRequest.api.load({
      test: {
        go: {
          url: 'https://reqres.in/api/users',
          method: 'GET',
        },
      },
    })

    await expect(new ApiRequest('test.go')).resolves.toBeInstanceOf(Object)
    await expect(new ApiRequest('test.go')).resolves.toHaveProperty('page')
  })

  test('merge string api', async () =>
  {

    ApiRequest.api.merge({
      test2: {
        str: 'https://reqres.in/api/users',
      },
    })

    await expect(new ApiRequest('test2.str')).resolves.toBeInstanceOf(Object)
    await expect(new ApiRequest('test2.str')).resolves.toHaveProperty('page')
  })

  test('no config', () => {
    ApiRequest.config()
    ApiRequest.api.clear()

    // Default API
    expect(ApiRequest.api).toBeInstanceOf(RepositoryLite)
    expect(ApiRequest.api.all()).toEqual({})

    // Default useFactoryOnProduction
    expect(ApiRequest.defaults.useFactoryOnProduction).toBe(false)

    // Default Factory
    expect(ApiRequest.defaults.factory).toBeInstanceOf(Factory)
  })

  test('empty config', () =>
  {
    ApiRequest.config({})
    ApiRequest.api.clear()

    // Default API
    expect(ApiRequest.api).toBeInstanceOf(RepositoryLite)
    expect(ApiRequest.api.all()).toEqual({})

    // Default useFactoryOnProduction
    expect(ApiRequest.defaults.useFactoryOnProduction).toBe(false)

    // Default Factory
    expect(ApiRequest.defaults.factory).toBeInstanceOf(Factory)
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

    ApiRequest.config({
      data: api,
      useFactoryOnProduction: true,
      factory: fakeFactory,
    })

    expect(api).toBe(api)
    expect(ApiRequest.defaults.factory).toBe(fakeFactory)
    expect(ApiRequest.defaults.useFactoryOnProduction).toBe(true)
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

    await expect(new ApiRequest('wode.ge')).resolves.toEqual([fake])
  })
})
