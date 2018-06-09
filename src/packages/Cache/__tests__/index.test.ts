import {
  Cache,
} from '../index'

import CacheEngine from '../Engine/CacheEngine'

describe('CacheEngine Index Tests', () => {
  test('export correctly', () => {
    // case: cache
    expect(
      Cache
    ).toBeInstanceOf(CacheEngine)
  })
})