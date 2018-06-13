import { DataMigration } from '../index'

describe('DataMigration', () =>
{
  test('.parse', () =>
  {
    // Parse Flat Object With Deep Object
    const origin1 = { a: 1, b: 2, c: { d: 3 } }
    const t1 = new DataMigration({ a: 'a', b: 'b', d: 'c.d' })
      .parse(origin1)
    const e1 = { a: 1, b: 2, d: 3 }

    expect(t1).toEqual(e1)

    // Parse Deep Object With Deep Object
    const origin2 = { a: 1, b: 2, c: { d: 3 } }
    const t2 = new DataMigration({ a: { a: 'a', b: 'b' }, c: { f: 'c.d' } })
      .parse(origin2)
    const e2 = { a: { a: 1, b: 2 }, c: { f: 3 } }
    expect(t2).toEqual(e2)

    // Parse Deep Object With Deep Object Includes Date Instance
    const date = new Date()
    const origin3 = { a: 1, b: 2, c: { d: date } }
    const t3 = new DataMigration({ a: { a: 'a', b: 'b' }, c: { f: 'c.d' } })
      .parse(origin3)
    const e3 = { a: { a: 1, b: 2 }, c: { f: date } }
    expect(t3).toEqual(e3)
  })
})
