import RuaApi from '../RuaApi'

describe('RuaApi Tests', () => {
  test('init', () => {
    // case: new
    expect(
      new RuaApi() instanceof RuaApi
    ).toBeTruthy()
  })
})