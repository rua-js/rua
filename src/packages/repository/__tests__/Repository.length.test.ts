import { Repository } from '../engine'

describe('repository Repository .length tests', () =>
{
  test('empty', () =>
  {
    const repo: Repository = new Repository()

    expect(repo.length).toBe(0)
  })

  test('override', () =>
  {
    const repo: Repository = new Repository()
    repo.set('test', 1)
    repo.set('test', null)

    expect(repo.length).toBe(1)
  })

  test('with .set', () =>
  {
    const repo: Repository = new Repository()
    repo.set('test1', 1)
    repo.set('test2', 2)
    repo.set('test3', 3)

    expect(repo.length).toBe(3)
  })

  test('with .remove', () =>
  {
    const repo: Repository = new Repository()
    repo.set('test1', 1)
    repo.set('test2', 2)
    repo.set('test3', 3)
    repo.remove('test2')

    expect(repo.length).toBe(2)
  })

  test('with .clear', () =>
  {
    const repo: Repository = new Repository()
    repo.set('test1', 1)
    repo.set('test2', 2)
    repo.set('test3', 3)
    repo.clear()

    expect(repo.length).toBe(0)
  })
})
