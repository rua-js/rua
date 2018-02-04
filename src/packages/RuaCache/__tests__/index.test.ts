import {
  cache,
  RuaCache,
} from '../index'

describe('RuaCache Index Tests', () => {
  test('export correctly', () => {
    // case: cache
    expect(
      cache instanceof RuaCache
    ).toBeTruthy()
  })
})