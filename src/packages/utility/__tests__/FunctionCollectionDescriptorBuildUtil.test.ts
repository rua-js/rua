import FunctionCollectionUtil from '../FunctionCollectionUtil'
import FunctionCollectionDescriptorBuildUtil from '../FunctionCollectionDescriptorBuildUtil'
import Mock = jest.Mock

describe('FunctionCollectionDecoratorBuildUtil Test', () =>
{
  test('undefined case', () =>
  {
    const fn: Mock = jest.fn()
    const obj: any = {}

    const descriptor = FunctionCollectionDescriptorBuildUtil.create(obj, 'wode', fn)

    Object.defineProperty(obj, 'wode', descriptor)


    obj['wode']()

    expect(fn.mock.calls.length).toBe(1)
  })

  test('normal function case', () =>
  {
    const fn: Mock = jest.fn()
    const obj: any = {
      wode()
      {
        return fn(244)
      },
    }

    const descriptor = FunctionCollectionDescriptorBuildUtil.create(obj, 'wode', () => fn(133))

    Object.defineProperty(obj, 'wode', descriptor)

    obj['wode']()

    expect(fn.mock.calls.length).toBe(2)
    expect(fn.mock.calls[0][0]).toBe(133)
    expect(fn.mock.calls[1][0]).toBe(244)
  })

  test('FunctionCollectionUtil function case', () =>
  {
    const fn: Mock = jest.fn()
    const obj: any = {
      wode: FunctionCollectionUtil.create(() => fn(244)),
    }

    const descriptor = FunctionCollectionDescriptorBuildUtil.create(obj, 'wode', () => fn(133))

    Object.defineProperty(obj, 'wode', descriptor)

    obj['wode']()

    expect(fn.mock.calls.length).toBe(2)
    expect(fn.mock.calls[0][0]).toBe(133)
    expect(fn.mock.calls[1][0]).toBe(244)
  })

  test('delayed arrow function case', () =>
  {
    const fn: Mock = jest.fn()
    const obj: any = {
      wode: undefined,
    }

    const descriptor = FunctionCollectionDescriptorBuildUtil.create(obj, 'wode', () => fn(133))

    Object.defineProperty(obj, 'wode', descriptor)

    obj.wode = () => fn(244)

    obj['wode']()

    expect(fn.mock.calls.length).toBe(2)
    expect(fn.mock.calls[0][0]).toBe(133)
    expect(fn.mock.calls[1][0]).toBe(244)
  })
})
