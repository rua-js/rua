import { default as C } from '../Cache'

const Cache = new C

describe('Cache Tests(cache part)', () =>
{
  test('.set, .get', async () =>
  {
    const k = 'test1'
    const v = 'test-here1'
    // prep: .set
    await expect(Cache.set(k, v)).resolves.toBe(v)
    // case: get
    await expect(Cache.get(k)).resolves.toBe(v)
  })
  test('.remove', async () =>
  {
    const k1 = 'test1'
    const v1 = 'test-here1'
    const k2 = 'test2'
    const v2 = 'test-here2'
    // prep: set data
    await Cache.set(k1, v1)
    await Cache.set(k2, v2)
    // case: remove
    await expect(Cache.remove(k1)).resolves.toBe(v1)
    // case: check removal
    await expect(Cache.get('test1')).resolves.toBe(undefined)
  })

  test('.all', async () =>
  {
    const k1 = 'test1'
    const v1 = 'test-here1'
    const k2 = 'test2'
    const v2 = 'test-here2'
    // prep: set data
    await Cache.set(k1, v1)
    await Cache.set(k2, v2)
    // case: .all
    await expect(Cache.all()).resolves.toEqual({
      [k1]: v1,
      [k2]: v2,
    })
  })

  test('.clear', async () =>
  {
    const k1 = 'test1'
    const v1 = 'test-here1'
    const k2 = 'test2'
    const v2 = 'test-here2'
    // prep: set data
    await Cache.set(k1, v1)
    await Cache.set(k2, v2)
    // case: .clear
    await expect(Cache.clear()).resolves.toEqual({
      [k1]: v1,
      [k2]: v2,
    })
    // case: check removal
    await expect(Cache.all()).resolves.toEqual({})
  })

  test('.length', () =>
  {
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

  test('.keys', async () =>
  {
    // prep: set data
    await Cache.set('test1', 'test-here1')
    await Cache.set('test2', 'test-here2')
    // case: .keys
    await expect(Cache.keys()).resolves.toEqual(['test1', 'test2'])
  })

  test('expired', async () =>
  {
    const k1 = 'test1'
    const v1 = 'test-here1'
    const k2 = 'test2'
    const v2 = 'test-here2'
    // prep: set data
    await Cache.clear()
    await Cache.set(k1, v1)
    await Cache.set(k2, v2)
    // pre-check
    await expect(Cache.keys()).resolves.toEqual([k1, k2])

    // case: instant expired
    await Cache.set(k1, v1, 0)
    await expect(Cache.get(k1)).resolves.toEqual(undefined)

    // case: delayed expired
    await Cache.clear()
    await Cache.set(k1, v1, +new Date() + 300)
    await expect(Cache.get(k1)).resolves.toEqual(v1)
    await new Promise(resolve => setTimeout(resolve, 300))
    await expect(Cache.get(k1)).resolves.toEqual(undefined)

    // case: .keys
    await Cache.clear()
    await Cache.set(k1, v1, 0)
    await expect(Cache.keys()).resolves.toEqual([])
  })
})
