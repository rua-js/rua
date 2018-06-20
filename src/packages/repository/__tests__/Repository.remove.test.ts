import { Repository } from '../engine'
import * as faker from 'faker'

// todo: interpolator
describe('repository Repository .remove tests', () =>
{
  test('return value', () =>
  {
    // Return Data Case
    const repo: Repository = new Repository()
    const t1: Date = new Date()
    const e1: Date = t1
    const key: string = faker.address.city()

    repo.set(key, t1)
    expect(repo.remove(key)).toBe(e1)
  })

  test('removed', () =>
  {
    // Return Data Case
    const repo: Repository = new Repository()
    const t1: Date = new Date()
    const e1: Date = t1
    const key: string = faker.address.city()

    repo.set(key, t1)
    repo.remove(key)
    expect(repo.get(key)).toBe(undefined)
  })

  test('before hook', () =>
  {
    const fakeBeforeHook = jest.fn()
    const repo: Repository = new Repository({
      hooks: {
        beforeRemove: fakeBeforeHook,
      },
    })
    const key: string = faker.address.city()

    // First Call
    repo.remove(key)
    expect(fakeBeforeHook.mock.calls.length).toBe(1)

    // Second Call
    repo.remove(key)
    expect(fakeBeforeHook.mock.calls.length).toBe(2)
  })

  test('after hook', () =>
  {
    const fakeBeforeHook = jest.fn()
    const repo: Repository = new Repository({
      hooks: {
        afterRemove: fakeBeforeHook,
      },
    })
    const key: string = faker.address.city()

    // First Call
    repo.remove(key)
    expect(fakeBeforeHook.mock.calls.length).toBe(1)

    // Second Call
    repo.remove(key)
    expect(fakeBeforeHook.mock.calls.length).toBe(2)
  })

  test('multiple', () =>
  {
    const repo: Repository = new Repository()
    const t1: string[] = ['test1', 'test2']
    const e1: string[] = ['1', '2']
    repo.set(t1, e1)

    expect(repo.remove(t1)).toEqual(e1)
    expect(repo.get(t1)).toEqual([undefined, undefined])
  })

  test('full', () =>
  {
    const fakeBeforeHook = jest.fn()
    const repo: Repository = new Repository({
      shouldDeepClone: true,
      hooks: {
        beforeRemove: fakeBeforeHook,
      },
    })
    const t1: Date = new Date()
    const e1: Date = new Date(t1)
    const key: string = faker.address.city()

    // Not Reference
    expect(repo.remove(key)).not.toBe(e1)
    expect(fakeBeforeHook.mock.calls.length).toBe(1)

    // First Call
    repo.remove(key)
    expect(fakeBeforeHook.mock.calls.length).toBe(2)

    // Second Call
    repo.remove(key)
    expect(fakeBeforeHook.mock.calls.length).toBe(3)
  })
})
