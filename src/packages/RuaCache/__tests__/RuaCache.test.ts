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

  test('.all', () => {
    // prep: set data
    cache.set('test1', 'test-here1')
    cache.set('test2', 'test-here2')
    // case: .all
    expect(
      cache.all()
    ).toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
    })
  })

  test('.clear', () => {
    // prep: set data
    cache.set('test1', 'test-here1')
    cache.set('test2', 'test-here2')
    // case: .clear
    expect(
      cache.clear()
    ).toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
    })
    // case: check removal
    expect(
      cache.all()
    ).toEqual({})
  })

  test('.length', () => {
    // prep: set data
    cache.set('test1', 'test-here1')
    cache.set('test2', 'test-here2')
    // case: .length
    expect(
      cache.length()
    ).toBe(2)
    // prep: removal
    cache.remove('test2')
    // case: .length
    expect(
      cache.length()
    ).toBe(1)
  })

  test('.keys', () => {
    // prep: set data
    cache.set('test1', 'test-here1')
    cache.set('test2', 'test-here2')
    // case: .keys
    expect(
      cache.keys()
    ).toEqual(['test1', 'test2'])
  })
})