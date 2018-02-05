import {
  RuaApi,
  api,
} from '../index'

describe('RuaApi Index Tests', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      api instanceof RuaApi
    ).toBeTruthy()
  })
})
