import Collection from '../Collection'

describe('Collection Tests [until .isEmpty()]', () => {
  test('.all', () => {
    // prep
    const data = { test: 'all' }
    const collection = new Collection(data)

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
    let collection = new Collection(intArr)
    expect(
      collection.avg()
    ).toBe(5)

    // case: string array
    collection = new Collection(strArr)
    expect(
      collection.avg()
    ).toBe(5)

    // case: integer-value object
    collection = new Collection(intObj)
    expect(
      collection.avg()
    ).toBe(5)

    // case: string-value object
    collection = new Collection(strObj)
    expect(
      collection.avg()
    ).toBe(5)

    // case: keyed, array-array
    collection = new Collection(keyedArrArr)
    expect(
      collection.avg(0)
    ).toBe(5)

    // case: keyed, array-object
    collection = new Collection(keyedArrObj)
    expect(
      collection.avg('a')
    ).toBe(5)

    // case: keyed, object-array
    collection = new Collection(keyedObjArr)
    expect(
      collection.avg(0)
    ).toBe(5)

    // case: keyed, object-object
    collection = new Collection(keyedObjObj)
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
    let collection = new Collection(arr)
    expect(
      collection.chunk(4).all()
    ).toEqual(arrResult)

    // case: object
    collection = new Collection(obj)
    expect(
      collection.chunk(4).all()
    ).toEqual(objResult)
  })

  test('.collapse', () => {
    const arrArr = [[1, 2, 3], [4, 5, 6]]
    const arrArrResult = [1, 2, 3, 4, 5, 6]
    const arrObj = [{ a: 1, b: 2, c: 3 }, { c: 4, d: 5, e: 6 }]
    // index c is override from 3 to 4 (override only happens on object result)
    const arrObjResult = { a: 1, b: 2, c: 4, d: 5, e: 6 }
    const objObj = { a: { a: 1, b: 2, c: 3 }, b: { c: 4, d: 5, e: 6 } }
    const objObjResult = { a: 1, b: 2, c: 4, d: 5, e: 6 }
    const objArr = { a: [1, 2, 3], b: [3, 4, 5, 6] }
    // no override on array result
    const objArrResult = [1, 2, 3, 3, 4, 5, 6]

    // case: array-array
    expect(
      new Collection(arrArr).collapse().all()
    ).toEqual(arrArrResult)

    // case array-object
    expect(
      new Collection(arrObj).collapse().all()
    ).toEqual(arrObjResult)

    // case object-object
    expect(
      new Collection(objObj).collapse().all()
    ).toEqual(objObjResult)

    // case object-array
    expect(
      new Collection(objArr).collapse().all()
    ).toEqual(objArrResult)
  })

  test('.combine', () => {
    const arrBase = []
    const object
  })
})
