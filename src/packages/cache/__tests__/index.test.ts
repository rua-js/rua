import {
  Cache,
} from '../index'

import Cache from '../engine/Cache'

describe('Cache Index Tests', () => {
  test('export correctly', () => {
    // case: cache
    expect(
      Cache
    ).toBeInstanceOf(Cache)
  })
})