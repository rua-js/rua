import {
  fetch,
} from '../index'

describe('RuaFetch', () => {
  test('fetch', async () => {
    // case: success
    await expect(
      fetch('https://reqres.in/api/users')
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      fetch('https://reqres.in/api/users')
    ).resolves.toHaveProperty('page')
  })

  test('.abort', async () => {

  })
})