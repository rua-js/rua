import { Rules } from '../engine'

describe('Rules', () =>
{
  test('.all, .parseFromString', () =>
  {
    // Single rule Case
    const t1 = 'string'
    const e1 = [{ name: 'string', args: [] }]
    const rule1 = new Rules(t1)
    expect(rule1.all()).toEqual(e1)

    // Many Rules Case
    const t2 = 'required|wode'
    const e2 = [{ name: 'required', args: [] }, { name: 'wode', args: [] }]
    const rule2 = new Rules(t2)
    expect(rule2.all()).toEqual(e2)

    // Single rule With Arguments Case
    const t3 = 'string: 11'
    const e3 = [{ name: 'string', args: ['11'] }]
    const rule3 = new Rules(t3)
    expect(rule3.all()).toEqual(e3)

    // Many Rules With Arguments Case
    const t4 = 'string: 11|required: no'
    const e4 = [{ name: 'string', args: ['11'] }, { name: 'required', args: ['no'] }]
    const rule4 = new Rules(t4)
    expect(rule4.all()).toEqual(e4)

    // Many Rules With Some Has Arguments Case
    const t5 = 'string: 11|required'
    const e5 = [{ name: 'string', args: ['11'] }, { name: 'required', args: [] }]
    const rule5 = new Rules(t5)
    expect(rule5.all()).toEqual(e5)
  })
})
