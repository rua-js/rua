import {
  storage,
  event,
  Exception,
  // fetch,
  // catchedFetch,
} from '../index'

import Storage from '../packages/Storage/Storage'
import RuaEvent from '../packages/Event/Event'

describe('Rua Index Test', () => {
  test('exportation', () => {
    // *** Primitives ***
    // case: storage
    expect(
      storage instanceof Storage
    ).toBeTruthy()
    // case: event
    expect(
      event instanceof RuaEvent
    ).toBeTruthy()
    // case: Exception
    expect(
      new Exception() instanceof Error
    ).toBeTruthy()
    // case: fetch, rawFetch, cachedFetch
    // expect(
    //   fetch instanceof Function
    // ).toBeTruthy()
    // expect(
    //   catchedFetch instanceof Function
    // ).toBeTruthy()
  })
})