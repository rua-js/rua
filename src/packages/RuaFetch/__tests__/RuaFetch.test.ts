import {
  fetch,
  catchedFetch
} from '../index'

describe('RuaFetch', () => {
  test('fetch', async () => {
    await expect(
      fetch('https://reqres.in/api/users')
    ).resolves.toBeInstanceOf(Object)
  })
})