import Storage from '../Storage'
import { ApplicationContext } from '@ruax/core'
const storage = ApplicationContext.get(Storage)

describe('storage', () => {
  test('.set & .get', async () => {
    // .set
    await storage.set('test1', 'test-here')
    // .get
    await expect(
      storage.get('test1'),
    ).resolves.toBe('test-here')
  })
  test('.remove', async () => {
    // .set
    await storage.set('test1', 'test-here')
    // .remove
    await storage.remove('test1')
    // .get
    await expect(
      storage.get('test1'),
    ).resolves.toBe(undefined)
  })
  test('.length', async () => {
    // .set
    await storage.set('test1', 'test-here')
    await storage.set('test2', 'test-here')
    await storage.set('test3', 'test-here')
    // .length
    await expect(
      storage.length,
    ).resolves.toBe(3)
  })
  test('.clear', async () => {
    // .set
    await storage.set('test1', 'test-here')
    await storage.set('test2', 'test-here')
    await storage.set('test3', 'test-here')
    // .clear
    await storage.clear()
    // result
    await expect(
      storage.get('test1'),
    ).resolves.toBe(undefined)
  })
  test('.keys', async () => {
    // .set
    await storage.set('test1', 'test-here')
    await storage.set('test2', 'test-here')
    await storage.set('test3', 'test-here')
    // .keys
    await expect(
      storage.keys(),
    ).resolves.toEqual(['test1', 'test2', 'test3'])
  })
  test('.all', async () => {
    // .set
    await storage.set('test1', 'test-here')
    await storage.set('test2', 'test-here')
    await storage.set('test3', 'test-here')
    // .all
    await expect(
      storage.all(),
    ).resolves.toEqual({
      test1: 'test-here',
      test2: 'test-here',
      test3: 'test-here',
    })
  })
  test('multi .set', async () => {
    // multi .set
    await storage.set(['test1', 'test2', 'test3'], ['test-here1', 'test-here2', 'test-here3'])
    // check
    await expect(
      storage.all(),
    ).resolves.toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
      test3: 'test-here3',
    })
  })
  test('multi .get', async () => {
    // .set
    await storage.set('test1', 'test-here1')
    await storage.set('test2', 'test-here2')
    await storage.set('test3', 'test-here3')
    // multi .get
    await expect(
      storage.get(['test1', 'test2', 'test3']),
    ).resolves.toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
      test3: 'test-here3',
    })
  })
  test('multi .remove', async () => {
    await storage.set('test1', 'test-here1')
    await storage.set('test2', 'test-here2')
    await storage.set('test3', 'test-here3')
    // multi .remove
    await storage.remove(['test1', 'test3'])
    // check
    await expect(
      storage.all(),
    ).resolves.toEqual({
      test2: 'test-here2',
    })
  })
})
