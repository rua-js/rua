import { storage } from '../index'
import RuaStorage from '../RuaStorage'
import { packager } from 'rua-core/lib'

describe('Index', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      storage instanceof RuaStorage
    ).toBeTruthy()
  })
  test('registered correctly', () => {
    // case: has
    expect(
      packager.hasPackage('rua-storage')
    ).toBeTruthy()
    // case: get
    expect(
      packager.getPackage('rua-storage') instanceof RuaStorage
    ).toBeTruthy()
  })
})