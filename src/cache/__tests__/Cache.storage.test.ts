import { Storage } from '../../storage'
import { default as C } from '../Cache'

const Cache = new C

Cache.appendPersistKey('test1', 'test2')

describe('Cache Tests(storage part)', () =>
{
  test('.set, .get', async () =>
  {
    // prep: .set
    await Cache.set('test1', 'test-here1')
    // case: get
    await expect(
      // @ts-ignore: protected
      Storage.get('test1'),
    ).resolves.toBe('test-here1')
  })
  test('.remove', async () =>
  {
    // prep: set data
    await Cache.set('test1', 'test-here1')
    await Cache.set('test2', 'test-here2')
    // case: remove
    await expect(
      await Cache.remove('test1'),
    ).toBe('test-here1')
    // case: check storage removal
    await expect(
      // @ts-ignore: protected
      Storage.get('test1'),
    ).resolves.toBe(undefined)
    await expect(
      // @ts-ignore: protected
      Storage.get('test2'),
    ).resolves.toBe('test-here2')
  })

  test('.all', async () =>
  {
    // prep: set data
    await Cache.set('test1', 'test-here1')
    await Cache.set('test2', 'test-here2')
    // case: .all
    await expect(
      Storage.all(),
    ).resolves.toEqual({
      // @ts-ignore: protected
      // @ts-ignore: protected
      ['test1']: 'test-here1',
      // @ts-ignore: protected
      ['test2']: 'test-here2',
    })
  })

  test('.clear', async () =>
  {
    // prep: set data
    await Cache.set('test1', 'test-here1')
    await Cache.set('test2', 'test-here2')
    // case: .clear
    await expect(
      await Cache.clear(),
    ).toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
    })
    // case: check removal
    await expect(
      Storage.all(),
    ).resolves.toEqual({})
  })

  test('.length', async () =>
  {
    // prep: set data
    await Cache.set('test1', 'test-here1')
    await Cache.set('test2', 'test-here2')
    // prep: removal
    await Cache.remove('test2')
    // case: .length
    await expect(
      Storage.length,
    ).resolves.toBe(1)
  })

  test('.keys', async () =>
  {
    // prep: set data
    Cache.set('test1', 'test-here1')
    Cache.set('test2', 'test-here2')
    // case: .keys
    await expect(
      Storage.keys(),
    ).resolves.toEqual([
      // @ts-ignore: protected
      'test1',
      // @ts-ignore: protected
      'test2',
    ])
  })
})
