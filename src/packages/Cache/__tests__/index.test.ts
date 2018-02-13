import {
  cache,
  Cache,
} from '../index'

describe('Cache Index Tests', () => {
  test('export correctly', () => {
    // case: cache
    expect(
      cache instanceof Cache
    ).toBeTruthy()
  })
})