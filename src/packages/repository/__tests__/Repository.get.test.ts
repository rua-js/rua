import { Repository } from '../engine'
import Mock = jest.Mock

describe('repository Repository .get tests', () =>
{
  test('basic', () =>
  {
    const repo: Repository = new Repository()
    const t1: Date = new Date()
    const e1: Date = t1
    repo.set('test', t1)

    expect(repo.get('test')).toBe(e1)
  })

  test('deep clone', () =>
  {
    const repo: Repository = new Repository({
      shouldDeepClone: true,
    })
    const t1: Date = new Date()
    const e1: Date = new Date(t1)
    repo.set('test', t1)

    expect(repo.get('test')).not.toBe(t1)
    expect(repo.get('test')).toEqual(e1)
  })

  test('multiple', () =>
  {
    const repo: Repository = new Repository()
    repo.set('test1', 1)
    repo.set('test2', 2)
    repo.set('test3', 3)
    const e1 = [1, 2]

    expect(repo.get(['test1', 'test2'])).toEqual(e1)
  })

  test('default value', () =>
  {
    const repo: Repository = new Repository()
    repo.set('test', undefined)
    const _default = 'deft?'

    expect(repo.get('test', _default)).toBe(_default)
  })

  test('interpolator', () =>
  {
    const fakeInterpolator = jest.fn()
    const repo: Repository = new Repository()
    const key = 'test'
    const value = 'someVal'
    const interpolatedValue = 'interpolatedValue'
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
    const key = 'test'
    const _default = 'deft'

    repo.get(key, _default, fakeInterpolator)
    expect(fakeHook.mock.calls.length).toBe(1)
    expect(fakeInterpolator.mock.calls.length).toBe(1)
    expect(fakeInterpolator.mock.calls[0]).toBe(1)
    expect(fakeHook.mock.calls[0][0]).toBe(repo)
    expect(fakeHook.mock.calls[0][1]).toBe(key)
    expect(fakeHook.mock.calls[0][2]).toBe(_default)
    expect(fakeHook.mock.calls[0][3]).toBe(fakeInterpolator)

    repo.get(key, _default, fakeInterpolator)
    expect(fakeInterpolator.mock.calls.length).toBe(2)
    expect(fakeInterpolator.mock.calls[0]).toBe(1)
    expect(fakeHook.mock.calls.length).toBe(2)
    expect(fakeHook.mock.calls[1][0]).toBe(repo)
    expect(fakeHook.mock.calls[1][1]).toBe(key)
    expect(fakeHook.mock.calls[1][2]).toBe(_default)
    expect(fakeHook.mock.calls[1][3]).toBe(fakeInterpolator)
  })
})
