import FunctionCollectionUtil from '../FunctionCollectionUtil'

describe('Util FunctionCollection Util Test', () =>
{
  test('correct property case', () =>
  {
    expect(FunctionCollectionUtil.create()).toHaveProperty('fnList')
    expect(FunctionCollectionUtil.create()).toHaveProperty('add')
  })

  test('basic usage case', () =>
  {
    const fn1 = jest.fn()
    const fn2 = jest.fn()

    const fnCollection = FunctionCollectionUtil
      .create()
      .add(fn1)
      .add(fn2)

    fnCollection.invoke()

    expect(fn1.mock.calls.length).toBe(1)
    expect(fn2.mock.calls.length).toBe(1)
  })

  test('correct invoke order case', () =>
  {
    const fn1 = jest.fn()

    const fnCollection = FunctionCollectionUtil
      .create()
      .add(() => fn1(133))
      .add(() => fn1(244))

    fnCollection.invoke()

    expect(fn1.mock.calls.length).toBe(2)
    expect(fn1.mock.calls[0].length).toBe(1)
    expect(fn1.mock.calls[1].length).toBe(1)
    expect(fn1.mock.calls[0][0]).toBe(133)
    expect(fn1.mock.calls[1][0]).toBe(244)
  })

  test('.is method case', () =>
  {
    const fnCollection = FunctionCollectionUtil.create()

    expect(FunctionCollectionUtil.is(fnCollection)).toBe(true)

    const fnCollection2 = FunctionCollectionUtil.create(() => 0).add(() => 1)

    expect(FunctionCollectionUtil.is(fnCollection2)).toBe(true)

  })
})
