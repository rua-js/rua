import { Storage } from '../../Storage'
import { Cache } from '../index'
import { util } from '../../utility'

describe('CacheEngine Tests(Storage part)', () => {
  test('.set, .get', async () => {
    // prep: .set
    await Cache.set('test1', 'test-here1')
    await util.delay(500)
    // case: get
    await expect(
      // @ts-ignore: protected
      Storage.get(Cache.getItemKeyName('test1'))
    ).resolves.toBe('test-here1')
  })
  test('.remove', async () => {
    // prep: set data
    await Cache.set('test1', 'test-here1')
    await Cache.set('test2', 'test-here2')
    await util.delay(500)
    // case: remove
    expect(
      Cache.remove('test1')
    ).toBe('test-here1')
    await util.delay(500)
    // case: check Storage removal
    await expect(
      // @ts-ignore: protected
      Storage.get(Cache.getItemKeyName('test1'))
    ).resolves.toBe(undefined)
    await expect(
      // @ts-ignore: protected
      Storage.get(Cache.getItemKeyName('test2'))
    ).resolves.toBe('test-here2')
  })

  test('.all', async () => {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    await util.delay(500)
    // case: .all
    await expect(
      Storage.all()
    ).resolves.toEqual({
      // @ts-ignore: protected
      [Cache.getListKeyName()]: [
        // @ts-ignore: protected
        Cache.getItemKeyName('test2'),
        // @ts-ignore: protected
        Cache.getItemKeyName('test1'),
      ],
      // @ts-ignore: protected
      [Cache.getItemKeyName('test1')]: 'test-here1',
      // @ts-ignore: protected
      [Cache.getItemKeyName('test2')]: 'test-here2',
    })
  })

  test('.clear', async () => {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    await util.delay(500)
    // case: .clear
    expect(
      Cache.clear()
    ).toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
    })
    await util.delay(500)
    // case: check removal
    await expect(
      Storage.all()
    ).resolves.toEqual({})
  })

  test('.length', async () => {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    await util.delay(500)
    // prep: removal
    Cache.remove('test2')
    await util.delay(500)
    // case: .length
    await expect(
      Storage.length()
    ).resolves.toBe(1+1)
  })

  test('.keys', async () => {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    await util.delay(500)
    // case: .keys
    await expect(
      Storage.keys()
    ).resolves.toEqual([
      // @ts-ignore: protected
      Cache.getListKeyName(),
      // @ts-ignore: protected
      Cache.getItemKeyName('test1'),
      // @ts-ignore: protected
      Cache.getItemKeyName('test2'),
    ])
  })
})