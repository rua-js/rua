import RuaCollection from '../RuaCollection'

describe('RuaCollection Tests [until .isEmpty()]', () => {
  test('.all', () => {
    // prep
    const data = { test: 'all' }
    const collection = new RuaCollection(data)

    // case: NO reference
    expect(
      collection.all()
    ).not.toBe(data)

    // case: equal
    expect(
      collection.all()
    ).toEqual(data)
  })

  test('.avg', () => {
    // prep
    const intArr = [1, 3, 5, 7, 9]
    const strArr = ['1', '3', '5', '7', '9']
    const intObj = { a: 1, b: 3, c: 5, d: 7, e: 9 }
    const strObj = { a: '1', b: '3', c: '5', d: '7', e: '9' }
    const keyedArrArr = [
      [1], [3], [5], [7], [9]
    ]
    const keyedArrObj = [
      { a: 1 }, { a: 3 }, { a: 5 }, { a: 7 }, { a: 9 }
    ]
    const keyedObjArr = {
      a: [1], b: [3], c: [5], d: [7], e: [9],
    }

    const keyedObjObj = {
      a: { a: 1 }, b: { a: 3 }, c: { a: 5 }, d: { a: 7 }, e: { a: 9 },
    }

    // case: integer array
    let collection = new RuaCollection(intArr)
    expect(
      collection.avg()
    ).toBe(5)

    // case: string array
    collection = new RuaCollection(strArr)
    expect(
      collection.avg()
    ).toBe(5)

    // case: integer-value object
    collection = new RuaCollection(intObj)
    expect(
      collection.avg()
    ).toBe(5)

    // case: string-value object
    collection = new RuaCollection(strObj)
    expect(
      collection.avg()
    ).toBe(5)

    // case: keyed, array-array
    collection = new RuaCollection(keyedArrArr)
    expect(
      collection.avg(0)
    ).toBe(5)

    // case: keyed, array-object
    collection = new RuaCollection(keyedArrObj)
    expect(
      collection.avg('a')
    ).toBe(5)

    // case: keyed, object-array
    collection = new RuaCollection(keyedObjArr)
    expect(
      collection.avg(0)
    ).toBe(5)

    // case: keyed, object-object
    collection = new RuaCollection(keyedObjObj)
    expect(
      collection.avg('a')
    ).toBe(5)
  })
})