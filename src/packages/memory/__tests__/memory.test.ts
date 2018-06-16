import { memory } from '../index'
import AnyObject from '../../type/data/AnyObject'

describe('memory', () =>
{

  test('.set, .get', () =>
  {
    // Regular Case
    const t1: number = 111
    const e1: number = t1
    memory.set('t1', t1)
    expect(memory.get('t1')).toBe(e1)

    // Reference Case
    const t2: Date = new Date()
    const e2: Date = t2
    memory.set('t2', t2)
    expect(memory.get('t2')).toBe(e2)

    // Default Value Case
    const t3: undefined = undefined
    const e3: string = 'default'
    memory.set('t3', t3)
    expect(memory.get('t3', e3)).toBe(e3)

    // Multi Return Value Case
    const t4: number = 444
    const t5: number = 555
    const e45: number[] = [t4, t5]
    expect(memory.set(['t4', 't5'], [t4, t5])).toEqual(e45)

    // Multi Regular Case
    const e5: number = t5
    const e6: number[] = [t4, t5]
    expect(memory.get('t5')).toBe(e5)
    expect(memory.get(['t4', 't5'])).toEqual(e6)
  })

  test('.remove', () =>
  {
    // Regular Case
    const t1: number = 111
    memory.set('t1', t1)
    memory.remove('t1')
    expect(memory.get('t1')).toBe(undefined)

    // Return Value Case
    const t2: number = 222
    const e2: number = t2
    memory.set('t2', t2)
    expect(memory.remove('t2')).toBe(e2)

    // Return Reference Case
    const t3: Date = new Date()
    const e3: Date = t3
    memory.set('t3', t3)
    expect(memory.remove('t3')).toBe(e3)

    // Multi Return Value Case
    const t4: number = 444
    const t5: number = 555
    const e45: number[] = [t4, t5]
    memory.set(['t4', 't5'], [t4, t5])
    expect(memory.remove(['t4', 't5'])).toEqual(e45)

    // Multi Regular Case
    const e6: undefined[] = [undefined, undefined]
    expect(memory.get(['t4', 't5'])).toEqual(e6)
  })

  test('.all', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: AnyObject = { t1, t2, t3 }
    memory.set('t1', t1)
    memory.set('t2', t2)
    memory.set('t3', t3)
    expect(memory.all()).toEqual(e123)

    // Reference Case
    const t4: Date = new Date()
    memory.set('t4', t4)
    expect(memory.all()['t4']).toBe(t4)
  })

  test('.clear', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: undefined = undefined
    memory.set('t1', t1)
    memory.set('t2', t2)
    memory.set('t3', t3)
    memory.clear()
    expect(memory.get('t1')).toBe(e123)
    expect(memory.get('t2')).toBe(e123)
    expect(memory.get('t3')).toBe(e123)

    // Return Value Case
    const t4: number = 111
    const t5: number = 222
    const t6: number = 333
    const e456: AnyObject = { t4, t5, t6 }
    memory.set('t4', t4)
    memory.set('t5', t5)
    memory.set('t6', t6)
    expect(memory.clear()).toEqual(e456)
  })

  test('.length', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: number = 3
    memory.set('t1', t1)
    memory.set('t2', t2)
    memory.set('t3', t3)
    expect(memory.length).toBe(e123)

    // Removed Case
    const e4: number = 2
    memory.remove('t2')
    expect(memory.length).toBe(e4)

    // Clear Case
    const e5: number = 0
    memory.clear()
    expect(memory.length).toBe(e5)
  })

  test('.keys', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: string[] = ['t1', 't2', 't3']
    memory.set('t1', t1)
    memory.set('t2', t2)
    memory.set('t3', t3)
    expect(memory.keys()).toEqual(e123)

    // Removed Case
    const e4: string[] = ['t1', 't3']
    memory.remove('t2')
    expect(memory.keys()).toEqual(e4)

    // Cleared Case
    const e5: void[] = []
    memory.clear()
    expect(memory.keys()).toEqual(e5)
  })

  test('.value', () =>
  {
    // Regular Case
    const t1: number = 111
    const t2: number = 222
    const t3: number = 333
    const e123: number[] = [t1, t2, t3]
    memory.set('t1', t1)
    memory.set('t2', t2)
    memory.set('t3', t3)
    expect(memory.values()).toEqual(e123)

    // Removed Case
    const e4: number[] = [t1, t3]
    memory.remove('t2')
    expect(memory.values()).toEqual(e4)

    // Cleared Case
    const e5: void[] = []
    memory.clear()
    expect(memory.values()).toEqual(e5)
  })
})
