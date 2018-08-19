import { Model, Effect, Reducer, State, Subscription } from '../decorators'
import { DvaModel } from '../types'

describe('Dva Decorators Tests', () =>
{
  @Model
  class FakeModel
  {
    @State
    public state = {
      a: 1,
      b: 2,
    }

    @Reducer
    public c()
    {
      return 'ccc'
    }

    @Reducer
    public d = () => 'ddd'

    @Effect
    public e()
    {
      return 'eee'
    }

    @Effect
    public f = () => 'fff'

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
    public i = () => 'iii'
  }

  test('generates correct structure', () =>
  {
    expect(FakeModel).toHaveProperty('namespace', 'fakeModel')
    expect(FakeModel).toHaveProperty('state')
    expect(FakeModel).toHaveProperty('reducers')
    expect(FakeModel).toHaveProperty('effects')
    expect(FakeModel).toHaveProperty('subscriptions')
  })

  test('State works correctly', () =>
  {
    expect((FakeModel as DvaModel).state!.a).toBe(1)
    expect((FakeModel as DvaModel).state!.b).toBe(2)
  })

  test('Reducer works correctly', () =>
  {
    expect((FakeModel as DvaModel).reducers!.c()).toBe('ccc')
    expect((FakeModel as DvaModel).reducers!.d()).toBe('ddd')
  })

  test('Effect works correctly', async () =>
  {
    expect((FakeModel as DvaModel).effects!.e()).toBe('eee')
    expect((FakeModel as DvaModel).effects!.f()).toBe('fff')
    expect(
      (FakeModel as DvaModel).effects!.g()
        .next()
        .value,
    ).toBe('ggg')
  })
})
