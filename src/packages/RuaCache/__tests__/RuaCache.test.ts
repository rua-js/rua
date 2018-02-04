import {
  cache,
} from '../index'

describe('RuaCache Tests(cache part)', () => {
  test('.set, .get', () => {
    // prep: .set
    cache.set('test1', 'test-here1')
    // case: get
    expect(
      cache.get('test1')
    ).toBe('test-here1')
  })
  test('.remove', () => {
    // prep: set data
    cache.set('test1', 'test-here1')
    cache.set('test2', 'test-here2')
    // case: remove
    expect(
      cache.remove('test1')
    ).toBe('test-here1')
    // case: check removal
    expect(
      cache.get('test1')
    ).toBe(undefined)
  })
})