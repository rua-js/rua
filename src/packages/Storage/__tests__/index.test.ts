import { storage } from '../index'
import Storage from '../Storage'
import { packager } from 'rua-core/lib'

describe('Index', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      storage instanceof Storage
    ).toBeTruthy()
  })
  test('registered correctly', () => {
    // case: has
    expect(
      packager.hasPackage('rua-storage')
    ).toBeTruthy()
    // case: get
    expect(
      packager.getPackage('rua-storage') instanceof Storage
    ).toBeTruthy()
  })
})