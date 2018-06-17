import { Storage } from '../index'
import StorageEngine from '../Engine/StorageEngine'

describe('Index', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      Storage
    ).toBeInstanceOf(StorageEngine)
  })
})