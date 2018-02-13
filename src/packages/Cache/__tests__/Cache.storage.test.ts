import { storage } from '../../Storage'
import { cache } from '../index'
import { util } from '../../Util'

describe('Cache Tests(storage part)', () => {
  test('.set, .get', async () => {
    // prep: .set
    await cache.set('test1', 'test-here1')
    await util.delay(500)
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
    await util.delay(500)
    // case: remove
    expect(
      cache.remove('test1')
    ).toBe('test-here1')
    await util.delay(500)
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
    await util.delay(500)
    // case: .all
    await expect(
      storage.all()
    ).resolves.toEqual({
      // @ts-ignore: protected
      [cache.getListKeyName()]: [
        // @ts-ignore: protected
        cache.getItemKeyName('test2'),
        // @ts-ignore: protected
        cache.getItemKeyName('test1'),
      ],
      // @ts-ignore: protected
      [cache.getItemKeyName('test1')]: 'test-here1',
      // @ts-ignore: protected
      [cache.getItemKeyName('test2')]: 'test-here2',
    })
  })

  test('.clear', async () => {
    // prep: set data
    cache.set('test1', 'test-here1')
    cache.set('test2', 'test-here2')
    await util.delay(500)
    // case: .clear
    expect(
      cache.clear()
    ).toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
    })
    await util.delay(500)
    // case: check removal
    await expect(
      storage.all()
    ).resolves.toEqual({})
  })

  test('.length', async () => {
    // prep: set data
    cache.set('test1', 'test-here1')
    cache.set('test2', 'test-here2')
    await util.delay(500)
    // prep: removal
    cache.remove('test2')
    await util.delay(500)
    // case: .length
    await expect(
      storage.length()
    ).resolves.toBe(1+1)
  })

  test('.keys', async () => {
    // prep: set data
    cache.set('test1', 'test-here1')
    cache.set('test2', 'test-here2')
    await util.delay(500)
    // case: .keys
    await expect(
      storage.keys()
    ).resolves.toEqual([
      // @ts-ignore: protected
      cache.getListKeyName(),
      // @ts-ignore: protected
      cache.getItemKeyName('test1'),
      // @ts-ignore: protected
      cache.getItemKeyName('test2'),
    ])
  })
})