import { Repository } from '../engine'

describe('repository Repository .set tests', () =>
{
  test('return value', () =>
  {
    // Return Data Case
    const repo: Repository = new Repository()
    const t1: Date = new Date()
    const e1: Date = t1
    expect(repo.set('test', t1)).toBe(e1)
  })

  test('deep clone', () =>
  {
    const repo: Repository = new Repository({
      shouldDeepClone: true,
    })
    const t1: Date = new Date()
    const e1: Date = new Date(t1)
    expect(repo.set('test', t1)).not.toBe(t1)

    expect(repo.set('test', t1)).toEqual(e1)
  })

  test('before hook', () =>
  {
    const fakeBeforeHook = jest.fn()
    const repo: Repository = new Repository({
      hooks: {
        beforeSet: fakeBeforeHook,
      },
    })

    // First Call
    repo.set('test', 'test')
    expect(fakeBeforeHook.mock.calls.length).toBe(1)

    // Second Call
    repo.set('test', 'test')
    expect(fakeBeforeHook.mock.calls.length).toBe(2)
  })

  test('after hook', () =>
  {
    const fakeBeforeHook = jest.fn()
    const repo: Repository = new Repository({
      hooks: {
        afterSet: fakeBeforeHook,
      },
    })

    // First Call
    repo.set('test', 'test')
    expect(fakeBeforeHook.mock.calls.length).toBe(1)

    // Second Call
    repo.set('test', 'test')
    expect(fakeBeforeHook.mock.calls.length).toBe(2)
  })

  test('multiple', () =>
  {
    const repo: Repository = new Repository()
    const t1: string[] = ['test1', 'test2']
    const e1: string[] = ['1', '2']

    expect(repo.set(t1, e1)).toBe(e1)
  })

  test('full', () =>
  {
    const fakeBeforeHook = jest.fn()
    const repo: Repository = new Repository({
      shouldDeepClone: true,
      hooks: {
        beforeSet: fakeBeforeHook,
      },
    })
    const t1: Date = new Date()
    const e1: Date = new Date(t1)

    // Not Reference
    expect(repo.set('test', t1)).not.toBe(e1)
    expect(fakeBeforeHook.mock.calls.length).toBe(1)

    // First Call
    repo.set('test', 'test')
    expect(fakeBeforeHook.mock.calls.length).toBe(2)

    // Second Call
    repo.set('test', 'test')
    expect(fakeBeforeHook.mock.calls.length).toBe(3)
  })
})
