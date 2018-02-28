import {
  cache,
} from '../index'

import Cache from '../Cache'

describe('Cache Index Tests', () => {
  test('export correctly', () => {
    // case: cache
    expect(
      cache instanceof Cache
    ).toBeTruthy()
  })
})