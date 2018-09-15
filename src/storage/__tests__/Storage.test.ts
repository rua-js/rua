import Storage from '../Storage'

describe('Storage', () => {
  test('.set & .get', async () => {
    // .set
    await Storage.set('test1', 'test-here')
    // .get
    await expect(
      Storage.get('test1'),
    ).resolves.toBe('test-here')
  })
  test('.remove', async () => {
    // .set
    await Storage.set('test1', 'test-here')
    // .remove
    await Storage.remove('test1')
    // .get
    await expect(
      Storage.get('test1'),
    ).resolves.toBe(undefined)
  })
  test('.length', async () => {
    // .set
    await Storage.set('test1', 'test-here')
    await Storage.set('test2', 'test-here')
    await Storage.set('test3', 'test-here')
    // .length
    await expect(
      Storage.length,
    ).resolves.toBe(3)
  })
  test('.clear', async () => {
    // .set
    await Storage.set('test1', 'test-here')
    await Storage.set('test2', 'test-here')
    await Storage.set('test3', 'test-here')
    // .clear
    await Storage.clear()
    // result
    await expect(
      Storage.get('test1'),
    ).resolves.toBe(undefined)
  })
  test('.keys', async () => {
    // .set
    await Storage.set('test1', 'test-here')
    await Storage.set('test2', 'test-here')
    await Storage.set('test3', 'test-here')
    // .keys
    await expect(
      Storage.keys(),
    ).resolves.toEqual(['test1', 'test2', 'test3'])
  })
  test('.all', async () => {
    // .set
    await Storage.set('test1', 'test-here')
    await Storage.set('test2', 'test-here')
    await Storage.set('test3', 'test-here')
    // .all
    await expect(
      Storage.all(),
    ).resolves.toEqual({
      test1: 'test-here',
      test2: 'test-here',
      test3: 'test-here',
    })
  })
  test('multi .set', async () => {
    // multi .set
    await Storage.set(['test1', 'test2', 'test3'], ['test-here1', 'test-here2', 'test-here3'])
    // check
    await expect(
      Storage.all(),
    ).resolves.toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
      test3: 'test-here3',
    })
  })
  test('multi .get', async () => {
    // .set
    await Storage.set('test1', 'test-here1')
    await Storage.set('test2', 'test-here2')
    await Storage.set('test3', 'test-here3')
    // multi .get
    await expect(
      Storage.get(['test1', 'test2', 'test3']),
    ).resolves.toEqual({
      test1: 'test-here1',
      test2: 'test-here2',
      test3: 'test-here3',
    })
  })
  test('multi .remove', async () => {
    await Storage.set('test1', 'test-here1')
    await Storage.set('test2', 'test-here2')
    await Storage.set('test3', 'test-here3')
    // multi .remove
    await Storage.remove(['test1', 'test3'])
    // check
    await expect(
      Storage.all(),
    ).resolves.toEqual({
      test2: 'test-here2',
    })
  })
})
