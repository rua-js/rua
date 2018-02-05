import { storage } from '../../RuaStorage'
import { cache } from '../index'

describe('RuaCache Tests(storage part)', () => {
  test('.set, .get', async () => {
    // prep: .set
    await cache.set('test1', 'test-here1')
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
    // case: get
    await expect(
      // @ts-ignore: protected
      storage.get(cache.getItemKeyName('test1'))
    ).resolves.toBe('test-here1')
  })
  test('.remove', async () => {
    // prep: set data
    await cache.set('test1', 'test-here1')
    await cache.set('test2', 'test-here2')
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
    // case: remove
    expect(
      cache.remove('test1')
    ).toBe('test-here1')
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
    // case: check storage removal
    await expect(
      // @ts-ignore: protected
      storage.get(cache.getItemKeyName('test1'))
    ).resolves.toBe(undefined)
    await expect(
      // @ts-ignore: protected
      storage.get(cache.getItemKeyName('test2'))
    ).resolves.toBe('test-here2')
  })

  test('.all', async () => {
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