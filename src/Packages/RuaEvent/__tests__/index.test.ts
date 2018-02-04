import { event } from '../index'
import RuaEvent from '../RuaEvent'
import { packager } from 'rua-core/lib'

describe('RuaEvent Index Tests', () => {
  test('export RuaEvent correctly', () => {
    // case: export correct RuaEvent
    expect(
      event instanceof RuaEvent
    ).toBeTruthy()
  })
  test('register RuaEvent correctly', () => {
    // case: has RuaEvent
    expect(
      packager.hasPackage('rua-event')
    ).toBeTruthy()
    // case: has correct RuaEvent
    expect(
      packager.getPackage('rua-event') instanceof RuaEvent
    ).toBeTruthy()
  })
})
