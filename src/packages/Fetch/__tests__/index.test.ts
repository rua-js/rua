import {
  fetch,
} from '../index'

describe('Fetch Index Tests', () => {
  test('export correctly', () => {
    // case: fetch
    expect(
      fetch instanceof Function
    ).toBeTruthy()
  })
})