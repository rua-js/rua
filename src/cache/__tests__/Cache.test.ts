import {
  Cache,
} from '../index'

describe('Cache Tests(cache part)', () => {
  test('.set, .get', () => {
    // prep: .set
    Cache.set('test1', 'test-here1')
    // case: get
    expect(Cache.get('test1')).toBe('test-here1')
  })
  test('.remove', async () => {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    // case: remove
    await expect(Cache.remove('test1')).resolves.toBe('test-here1')
    // case: check removal
    expect(Cache.get('test1')).toBe(undefined)
  })

  test('.all', () => {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    // case: .all
    expect(Cache.all()).toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
    })
  })

  test('.clear', async () => {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    // case: .clear
    await expect(Cache.clear()).resolves.toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
    })
    // case: check removal
    expect(Cache.all()).toEqual({})
  })

  test('.length', () => {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    // case: .length
    expect(Cache.length).toBe(2)
    // prep: removal
    Cache.remove('test2')
    // case: .length
    expect(Cache.length).toBe(1)
  })

  test('.keys', () => {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    // case: .keys
    expect(Cache.keys()).toEqual(['test1', 'test2'])
  })
})
