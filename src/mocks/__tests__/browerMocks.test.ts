import '../browserMocks'
import * as faker from 'faker'

// @ts-ignore
const localStorage = window.localStorage

describe('Mock (browserMock.ts)', () =>
{
  test('.setItem', () =>
  {
    const key = faker.address.country()
    const value = faker.address.city()

    localStorage.setItem(key, value)
  })

  test('.getItem', () =>
  {
    const key = faker.address.country()
    const value = faker.address.city()

    localStorage.setItem(key, value)
    expect(localStorage.getItem(key)).toBe(value)
  })

  test('.removeItem', () =>
  {
    const key = faker.address.country()
    const value = faker.address.city()

    localStorage.setItem(key, value)
    localStorage.removeItem(key)
    expect(localStorage.getItem(key)).toBe(null)
  })

  test('.clear', () =>
  {
    const key1 = faker.address.country()
    const value1 = faker.address.city()
    const key2 = faker.address.streetName()
    const value2 = faker.address.city()

    localStorage.setItem(key1, value1)
    localStorage.setItem(key2, value2)
    localStorage.clear()
    expect(localStorage.getItem(key1)).toBe(null)
    expect(localStorage.getItem(key2)).toBe(null)
  })

  test('.length', () =>
  {
    const key1 = faker.address.country()
    const value1 = faker.address.city()
    const key2 = faker.address.streetName()
    const value2 = faker.address.city()

    localStorage.setItem(key1, value1)
    localStorage.setItem(key2, value2)
    expect(localStorage.length).toBe(2)
  })

  test('.key', () =>
  {
    const key1 = faker.address.country()
    const value1 = faker.address.city()

    localStorage.clear()
    localStorage.setItem(key1, value1)
    expect(localStorage.key(0)).toBe(key1)
  })
})
