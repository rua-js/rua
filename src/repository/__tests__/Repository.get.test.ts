import { Repository } from '../engine'
import Mock = jest.Mock
import * as faker from 'faker'

describe('repository Repository .get tests', () =>
{
  test('basic', () =>
  {
    const repo: Repository = new Repository()
    const t1: Date = new Date()
    const e1: Date = t1
    const key: string = faker.address.city()
    repo.set(key, t1)

    expect(repo.get(key)).toBe(e1)
  })

  test('deep clone', () =>
  {
    const repo: Repository = new Repository({
      shouldDeepClone: true,
    })
    const t1: Date = new Date()
    const e1: Date = new Date(t1)
    const key: string = faker.address.city()
    repo.set(key, t1)

    expect(repo.get(key)).not.toBe(t1)
    expect(repo.get(key)).toEqual(e1)
  })

  test('multiple', () =>
  {
    const repo: Repository = new Repository()
    const key1: string = faker.address.city()
    const key2: string = faker.address.streetAddress()
    const key3: string = faker.address.country()
    const val1: string = faker.address.city()
    const val2: string = faker.address.streetAddress()
    const val3: string = faker.address.country()
    repo.set(key1, val1)
    repo.set(key2, val2)
    repo.set(key3, val3)
    const e1: string[] = [val1, val2]

    expect(repo.get([key1, key2])).toEqual(e1)
  })

  test('default value', () =>
  {
    const repo: Repository = new Repository()
    repo.set(faker.address.city(), undefined)
    const _default = faker.address.city()

    expect(repo.get('test', _default)).toBe(_default)
  })

  test('interpolator', () =>
  {
    const fakeInterpolator = jest.fn()
    const repo: Repository = new Repository()
    const key = faker.address.city()
    const value = faker.address.city()
    const interpolatedValue = faker.address.city()
    const interpolator = (someVal: string) => interpolatedValue + someVal
    repo.set(key, value)
    repo.get(key, undefined, fakeInterpolator)

    // Interpolator called once
    expect(fakeInterpolator.mock.calls.length).toBe(1)

    // Interpolator param count
    expect(fakeInterpolator.mock.calls[0].length).toBe(1)

    // Result Without Default Value
    expect(
      repo.get(key, undefined, interpolator),
    ).toBe(interpolatedValue + value)

  })

  test('before hook', () =>
  {
    const fakeHook: Mock = jest.fn()
    const repo: Repository = new Repository({
      hooks: {
        beforeGet: fakeHook,
      },
    })

    repo.get('test')
    expect(fakeHook.mock.calls.length).toBe(1)

    repo.get('test')
    expect(fakeHook.mock.calls.length).toBe(2)
  })

  test('after hook', () =>
  {
    const fakeHook: Mock = jest.fn()
    const fakeInterpolator = jest.fn()
    const repo: Repository = new Repository({
      hooks: {
        afterGet: fakeHook,
      },
    })
    const key = faker.address.city()
    const _default = faker.address.city()

    repo.get(key, _default, fakeInterpolator)
    expect(fakeHook.mock.calls.length).toBe(1)
    expect(fakeInterpolator.mock.calls.length).toBe(1)
    expect(fakeInterpolator.mock.calls[0]).toEqual([_default])
    expect(fakeHook.mock.calls[0][0]).toBe(repo)
    expect(fakeHook.mock.calls[0][1]).toBe(key)
    expect(fakeHook.mock.calls[0][2]).toBe(_default)
    expect(fakeHook.mock.calls[0][3]).toBe(fakeInterpolator)

    repo.get(key, _default, fakeInterpolator)
    expect(fakeInterpolator.mock.calls.length).toBe(2)
    expect(fakeInterpolator.mock.calls[0]).toEqual([_default])
    expect(fakeHook.mock.calls.length).toBe(2)
    expect(fakeHook.mock.calls[1][0]).toBe(repo)
    expect(fakeHook.mock.calls[1][1]).toBe(key)
    expect(fakeHook.mock.calls[1][2]).toBe(_default)
    expect(fakeHook.mock.calls[1][3]).toBe(fakeInterpolator)
  })
})
