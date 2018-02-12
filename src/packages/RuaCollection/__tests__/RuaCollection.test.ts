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

  test('.chunk', () => {
    // prep
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const arrResult = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10]]
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 }
    const objResult = [
      { a: 1, b: 2, c: 3, d: 4 },
      { e: 5, f: 6, g: 7, h: 8 },
      { i: 9, j: 10 },
    ]

    // case: array
    let collection = new RuaCollection(arr)
    expect(
      collection.chunk(4).all()
    ).toEqual(arrResult)

    // case: object
    collection = new RuaCollection(obj)
    expect(
      collection.chunk(4).all()
    ).toEqual(objResult)
  })

  test('.collapse', () => {
    const arrArr = [[1, 2, 3], [4, 5, 6]]
    const arrArrResult = [1, 2, 3, 4, 5, 6]
  })
})
