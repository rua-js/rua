import { AnyObject } from '../../../core/type/data'
import {
  ensure,
  ensureArray,
  ensureArrayLike,
  ensureBoolean,
  ensureObject,
  ensureObjectLike,
  ensurePlainObject,
  ensureSymbol,
  ensureInteger,
  ensureNumber,
} from '../ensure'

describe('utility ensure tests', () =>
{
  test('ensure', () =>
  {
    const date: Date = new Date()
    const fixData: Date = new Date()

    // Fulfill
    expect(ensure(date, 2)).toBe(date)

    // Fix with given data
    expect(ensure(undefined, fixData)).toBe(fixData)
  })

  test('ensureArray', () =>
  {
    const arr: any[] = []

    // Fulfill
    expect(ensureArray(arr)).toBe(arr)

    // Fix with default array
    expect(ensureArray({})).toEqual([])

    // Fix with given array
    expect(ensureArray({}, arr)).toEqual(arr)
  })

  test('ensureArrayLike', () =>
  {
    const arr: any[] = []

    // Fulfill
    expect(ensureArrayLike(arr)).toBe(arr)

    // Fix with default array
    expect(ensureArrayLike({})).toEqual([])

    // Fix with given array
    expect(ensureArrayLike({}, arr)).toEqual(arr)
  })

  test('ensureObject', () =>
  {
    const obj: AnyObject = {}

    // Fulfill
    expect(ensureObject(obj)).toBe(obj)

    // Fix with default array
    expect(ensureObject({})).toEqual({})

    // Fix with given array
    expect(ensureObject(1, obj)).toBe(obj)
  })

  test('ensureObjectLike', () =>
  {
    const obj: AnyObject = {}

    // Fulfill
    expect(ensureObjectLike(obj)).toBe(obj)

    // Fix with default value
    expect(ensureObjectLike({})).toEqual({})

    // Fix with given value
    expect(ensureObjectLike(1, obj)).toBe(obj)
  })

  test('ensurePlainObject', () =>
  {
    const obj: AnyObject = {}

    // Fulfill
    expect(ensurePlainObject(obj)).toBe(obj)

    // Fix with default value
    expect(ensurePlainObject({})).toEqual({})

    // Fix with given value
    expect(ensurePlainObject(1, obj)).toBe(obj)
  })

  test('ensureBoolean', () =>
  {
    const bool: boolean = false

    // Fulfill
    expect(ensureBoolean(bool)).toBe(bool)

    // Fix with transfer value to boolean
    expect(ensureBoolean(1)).toBe(true)

    // Fix with given value
    expect(ensureBoolean(1, false)).toBe(false)
  })

  test('ensureSymbol', () => {
    const symbol: Symbol = Symbol()

    // Fulfill
    expect(ensureSymbol(symbol)).toBe(symbol)

    // Fix with default value
    expect(typeof ensureSymbol(2)).toBe('symbol')

    // Fix with given value
    expect(ensureSymbol(1, symbol)).toBe(symbol)
  })

  test('ensureInteger', () => {
    const int: number = 1352

    // Fulfill
    expect(ensureInteger(int, 0)).toBe(int)

    // Fix with default value
    expect(ensureInteger(Number.MIN_VALUE, int)).toEqual(int)

    // Fix with given value
    expect(ensureInteger(1.1, int)).toBe(int)
  })

  test('ensureNumber', () => {
    const int: number = 1352.1

    // Fulfill
    expect(ensureNumber(int, 0)).toBe(int)

    // Fix with default value
    expect(ensureNumber('123', int)).toEqual(int)

    // Fix with given value
    expect(ensureNumber('ds', int)).toBe(int)
  })
})
