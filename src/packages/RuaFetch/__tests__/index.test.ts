import {
  fetch,
} from '../index'

describe('RuaFetch Index Tests', () => {
  test('export correctly', () => {
    // case: fetch
    expect(
      fetch instanceof Function
    ).toBeTruthy()
  })
})