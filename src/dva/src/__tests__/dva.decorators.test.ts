import { Effect, Model, Reducer, State, Subscription, action } from '../'
import { ApplicationContext } from '@ruax/core'
import DvaManager from '../DvaManager'
// import { DvaModel } from '../type'
type DvaModel = any

describe('Dva Decorators Tests', () =>
{
  @Model
  class FakeModel
  {
    public static className = 'fakeModel2'

    @State
    public state()
    {
      return {
        a: 1,
        b: 2,
      }
    }

    @Reducer
    public c()
    {
      return 'ccc'
    }

    @Reducer
    public d()
    {
      return 'ddd'
    }

    @Effect
    public e()
    {
      return 'eee'
    }

    @Effect
    public f()
    {
      return 'fff'
    }

    @Effect
    public* g()
    {
      return yield 'ggg'
    }

    @Subscription
    public h()
    {
      return 'hhh'
    }

    @Subscription
    public i()
    {
      return 'iii'
    }
  }

  const dvaManager = ApplicationContext.get(DvaManager)

  test('generates correct structure', () =>
  {
    expect(dvaManager.get()[0]).toHaveProperty('namespace', 'fakeModel2')
    expect(dvaManager.get()[0]).toHaveProperty('state')
    expect(dvaManager.get()[0]).toHaveProperty('reducers')
    expect(dvaManager.get()[0]).toHaveProperty('effects')
    expect(dvaManager.get()[0]).toHaveProperty('subscriptions')
  })

  test('dva enhance', () =>
  {
    expect((dvaManager.get()[0] as any).reducers).toHaveProperty('setState')
    expect((dvaManager.get()[0] as any).reducers).toHaveProperty('resetState')
    expect((dvaManager.get()[0] as any).reducers).toHaveProperty('mergeState')
    expect((dvaManager.get()[0] as any).reducers).toHaveProperty('assignState')
    expect((dvaManager.get()[0] as any).reducers).toHaveProperty('clearState')
    // expect((dvaManager.get( [0as any).reducers).toHaveProperty('backupState')
    // expect((dvaManager.get( [0as any).reducers).toHaveProperty('rollbackState')
  })

  test('State works correctly', () =>
  {
    expect((dvaManager.get()[0] as DvaModel).state!.a).toBe(1)
    expect((dvaManager.get()[0] as DvaModel).state!.b).toBe(2)
  })

  test('Reducer works correctly', () =>
  {
    expect((dvaManager.get()[0] as DvaModel).reducers!.c()).toBe('ccc')
    expect((dvaManager.get()[0] as DvaModel).reducers!.d()).toBe('ddd')
  })

  test('Effect works correctly', async () =>
  {
    expect((dvaManager.get()[0] as DvaModel).effects!.e()).toBe('eee')
    expect((dvaManager.get()[0] as DvaModel).effects!.f()).toBe('fff')
    expect(
      (dvaManager.get()[0] as DvaModel).effects!.g()
        .next()
        .value,
    ).toBe('ggg')
  })

  test('action function from dva manager', async () =>
  {
    expect(dvaManager.dvaAction.fakeModel2.c).toBeInstanceOf(Function)
    expect(dvaManager.dvaAction.fakeModel2.d).toBeInstanceOf(Function)
    expect(dvaManager.dvaAction.fakeModel2.e).toBeInstanceOf(Function)
    expect(dvaManager.dvaAction.fakeModel2.f).toBeInstanceOf(Function)

    expect(action.fakeModel2.c).toBeInstanceOf(Function)
    expect(action.fakeModel2.d).toBeInstanceOf(Function)
    expect(action.fakeModel2.e).toBeInstanceOf(Function)
    expect(action.fakeModel2.f).toBeInstanceOf(Function)
  })
})
