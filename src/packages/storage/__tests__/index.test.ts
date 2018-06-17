import { Storage } from '../index'
import StorageEngine from '../engine/StorageEngine'

describe('Index', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      Storage
    ).toBeInstanceOf(StorageEngine)
  })
})