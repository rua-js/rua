import { AnyObject } from '../../type/data'
import {
  ensure,
  ensureArray,
  ensureArrayLike,
  ensureBoolean,
  ensureObject,
  ensureObjectLike,
  ensurePlainObject,
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
  })

  test('ensurePlainObject', () =>
  {
    const obj: AnyObject = {}

    // Fulfill
    expect(ensurePlainObject(obj)).toBe(obj)

    // Fix with default array
    expect(ensurePlainObject({})).toEqual({})

    // Fix with given array
    expect(ensurePlainObject(1, obj)).toBe(obj)
  })

  test('ensureBoolean', () =>
  {
    const bool: boolean = false

    // Fulfill
    expect(ensureBoolean(bool)).toBe(bool)

    expect(ensureBoolean(1)).toBe(true)

    expect(ensureBoolean(1, false)).toBe(false)
  })
})
