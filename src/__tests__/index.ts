import {
  storage,
  event,
  Exception,
} from '../index'

import RuaStorage from '../packages/RuaStorage/RuaStorage'
import RuaEvent from '../packages/RuaEvent/RuaEvent'

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
    // Untestable

  })
})