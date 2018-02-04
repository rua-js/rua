import {
  fetch,
  catchedFetch,
} from '../index'

describe('RuaFetch Index Tests', () => {
  test('export correctly', () => {
    // case: fetch
    expect(
      fetch instanceof Function
    ).toBeTruthy()
    // case: catchedFetch
    expect(
      catchedFetch instanceof Function
    ).toBeTruthy()
  })
})