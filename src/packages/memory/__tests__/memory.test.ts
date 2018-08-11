import { Memory } from '../index'
import { AnyObject } from '../../core/type/data'

describe('Memory', () =>
{

  test('.set, .get', () =>
  {
    // Regular Case
    const t1: number = 111
    const e1: number = t1
    Memory.set('t1', t1)
    expect(Memory.get('t1')).toBe(e1)

    // Reference Case
    const t2: Date = new Date()
    const e2: Date = t2
    Memory.set('t2', t2)
    expect(Memory.get('t2')).toBe(e2)

    // Default Value Case
    const t3: undefined = undefined
    const e3: string = 'default'
    Memory.set('t3', t3)
    expect(Memory.get('t3', e3)).toBe(e3)
  })

  test('.remove', () =>
  {
    // Regular Case
    const t1: number = 111
    Memory.set('t1', t1)
    Memory.remove('t1')
    expect(Memory.get('t1')).toBe(undefined)

    // Return Value Case
    const t2: number = 222
    const e2: number = t2
    Memory.set('t2', t2)
    expect(Memory.remove('t2')).toBe(e2)

    // Return Reference Case
    const t3: Date = new Date()
    const e3: Date = t3
    Memory.set('t3', t3)
    expect(Memory.remove('t3')).toBe(e3)
  })

  test('.all', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: AnyObject = { t1, t2, t3 }
    Memory.set('t1', t1)
    Memory.set('t2', t2)
    Memory.set('t3', t3)
    expect(Memory.all()).toEqual(e123)

    // Reference Case
    const t4: Date = new Date()
    Memory.set('t4', t4)
    expect(Memory.all()['t4']).toBe(t4)
  })

  test('.clear', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: undefined = undefined
    Memory.set('t1', t1)
    Memory.set('t2', t2)
    Memory.set('t3', t3)
    Memory.clear()
    expect(Memory.get('t1')).toBe(e123)
    expect(Memory.get('t2')).toBe(e123)
    expect(Memory.get('t3')).toBe(e123)

    // Return Value Case
    const t4: number = 111
    const t5: number = 222
    const t6: number = 333
    const e456: AnyObject = { t4, t5, t6 }
    Memory.set('t4', t4)
    Memory.set('t5', t5)
    Memory.set('t6', t6)
    expect(Memory.clear()).toEqual(e456)
  })

  test('.length', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: number = 3
    Memory.set('t1', t1)
    Memory.set('t2', t2)
    Memory.set('t3', t3)
    expect(Memory.length).toBe(e123)

    // Removed Case
    const e4: number = 2
    Memory.remove('t2')
    expect(Memory.length).toBe(e4)

    // Clear Case
    const e5: number = 0
    Memory.clear()
    expect(Memory.length).toBe(e5)
  })

  test('.keys', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: string[] = ['t1', 't2', 't3']
    Memory.set('t1', t1)
    Memory.set('t2', t2)
    Memory.set('t3', t3)
    expect(Memory.keys()).toEqual(e123)

    // Removed Case
    const e4: string[] = ['t1', 't3']
    Memory.remove('t2')
    expect(Memory.keys()).toEqual(e4)

    // Cleared Case
    const e5: void[] = []
    Memory.clear()
    expect(Memory.keys()).toEqual(e5)
  })

  test('.value', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: number[] = [t1, t2, t3]
    Memory.set('t1', t1)
    Memory.set('t2', t2)
    Memory.set('t3', t3)
    expect(Memory.values()).toEqual(e123)

    // Removed Case
    const e4: number[] = [t1, t3]
    Memory.remove('t2')
    expect(Memory.values()).toEqual(e4)

    // Cleared Case
    const e5: void[] = []
    Memory.clear()
    expect(Memory.values()).toEqual(e5)
  })
})
