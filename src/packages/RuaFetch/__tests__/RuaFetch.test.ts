import {
  fetch,
  catchedFetch,
  rawFetch,
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
  test('catchedFetch', async () => {
    // case: success
    await expect(
      catchedFetch('https://reqres.in/api/users')
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      catchedFetch('https://reqres.in/api/users')
    ).resolves.toHaveProperty('data')
  })
  test('rawFetch', async () => {
    // case: success
    await expect(
      rawFetch('https://reqres.in/api/users')
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      rawFetch('https://reqres.in/api/users')
    ).resolves.toHaveProperty('body')
  })
})