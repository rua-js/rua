import {
  storage,
  event,
  Exception,
  // fetch,
  // catchedFetch,
} from '../index'

import RuaStorage from '../packages/RuaStorage/RuaStorage'
import RuaEvent from '../packages/Event/Event'

describe('Rua Index Test', () => {
  test('exportation', () => {
    // *** Primitives ***
    // case: storage
    expect(
      storage instanceof RuaStorage
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