import RuaApi from '../RuaApi'
import { api } from '../index'

describe('RuaApi Tests', () => {
  test('init', () => {
    // case: new
    expect(
      new RuaApi() instanceof RuaApi
    ).toBeTruthy()
  })
  test('usage', async () => {
    // prep: load api
    api.load({
      test: {
        go: {
          url: 'https://reqres.in/api/users',
          method: 'GET',
        }
      }
    })
    // case: success
    await expect(
      api.call('test.go')
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      api.call('test.go')
    ).resolves.toHaveProperty('page')
  })
})