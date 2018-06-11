import { MemoryEngine } from '../Engine'
import AnyObject from '../../Type/Data/AnyObject'

describe('MemoryEngine', () =>
{

  test('.set, .get', () =>
  {
    const me = new MemoryEngine()

    // Regular Case
    const t1: number = 111
    const e1: number = t1
    me.set('t1', t1)
    expect(me.get('t1')).toBe(e1)

    // Reference Case
    const t2: Date = new Date()
    const e2: Date = t2
    me.set('t2', t2)
    expect(me.get('t2')).toBe(e2)

    // Default Value Case
    const t3: undefined = undefined
    const e3: string = 'default'
    me.set('t3', t3)
    expect(me.get('t3', e3)).toBe(e3)

    // Multi Return Value Case
    const t4: number = 444
    const t5: number = 555
    const e45: number[] = [t4, t5]
    expect(me.set(['t4', 't5'], [t4, t5])).toEqual(e45)

    // Multi Regular Case
    const e5: number = t5
    const e6: number[] = [t4, t5]
    expect(me.get('t5')).toBe(e5)
    expect(me.get(['t4', 't5'])).toEqual(e6)
  })

  test('.remove', () =>
  {
    const me = new MemoryEngine()

    // Regular Case
    const t1: number = 111
    me.set('t1', t1)
    me.remove('t1')
    expect(me.get('t1')).toBe(undefined)

    // Return Value Case
    const t2: number = 222
    const e2: number = t2
    me.set('t2', t2)
    expect(me.remove('t2')).toBe(e2)

    // Return Reference Case
    const t3: Date = new Date()
    const e3: Date = t3
    me.set('t3', t3)
    expect(me.remove('t3')).toBe(e3)

    // Multi Return Value Case
    const t4: number = 444
    const t5: number = 555
    const e45: number[] = [t4, t5]
    me.set(['t4', 't5'], [t4, t5])
    expect(me.remove(['t4', 't5'])).toEqual(e45)

    // Multi Regular Case
    const e6: undefined[] = [undefined, undefined]
    expect(me.get(['t4', 't5'])).toEqual(e6)
  })

  test('.all', () =>
  {
    const me = new MemoryEngine()

    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: AnyObject = { t1, t2, t3 }
    me.set('t1', t1)
    me.set('t2', t2)
    me.set('t3', t3)
    expect(me.all()).toEqual(e123)

    // Reference Case
    const t4: Date = new Date()
    me.set('t4', t4)
    expect(me.all()['t4']).toBe(t4)
  })

  test('.clear', () =>
  {
    const me = new MemoryEngine()

    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: undefined = undefined
    me.set('t1', t1)
    me.set('t2', t2)
    me.set('t3', t3)
    me.clear()
    expect(me.get('t1')).toBe(e123)
    expect(me.get('t2')).toBe(e123)
    expect(me.get('t3')).toBe(e123)

    // Return Value Case
    const t4: number = 111
    const t5: number = 222
    const t6: number = 333
    const e456: AnyObject = { t4, t5, t6 }
    me.set('t4', t4)
    me.set('t5', t5)
    me.set('t6', t6)
    expect(me.clear()).toEqual(e456)
  })

  test('.length', () =>
  {
    const me = new MemoryEngine()

    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: number = 3
    me.set('t1', t1)
    me.set('t2', t2)
    me.set('t3', t3)
    expect(me.length).toBe(e123)

    // Removed Case
    const e4: number = 2
    me.remove('t2')
    expect(me.length).toBe(e4)

    // Clear Case
    const e5: number = 0
    me.clear()
    expect(me.length).toBe(e5)
  })

  test('.keys', () =>
  {
    const me = new MemoryEngine()

    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: string[] = ['t1', 't2', 't3']
    me.set('t1', t1)
    me.set('t2', t2)
    me.set('t3', t3)
    expect(me.keys()).toEqual(e123)

    // Removed Case
    const e4: string[] = ['t1', 't3']
    me.remove('t2')
    expect(me.keys()).toEqual(e4)

    // Cleared Case
    const e5: void[] = []
    me.clear()
    expect(me.keys()).toEqual(e5)
  })

  test('.value', () =>
  {
    const me = new MemoryEngine()

    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: number[] = [t1, t2, t3]
    me.set('t1', t1)
    me.set('t2', t2)
    me.set('t3', t3)
    expect(me.values()).toEqual(e123)

    // Removed Case
    const e4: number[] = [t1, t3]
    me.remove('t2')
    expect(me.values()).toEqual(e4)

    // Cleared Case
    const e5: void[] = []
    me.clear()
    expect(me.values()).toEqual(e5)
  })
})
