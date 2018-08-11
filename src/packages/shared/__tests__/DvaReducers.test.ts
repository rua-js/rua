import { dvaReducerGenerator } from '../index'

describe('DvaReducers', () =>
{
  const genFakeModel = () =>
  {
    return {
      namespace: 'fake',
      state: {
        shuai: 'ku',
        mei: 'hehe',
      },
      reducers: {
        ...dvaReducerGenerator(() => ({
          shuai: 'ku',
          mei: 'hehe2',
        })),
      },
    }
  }

  const genPayload = (payload: any) =>
  {
    return { payload }
  }

  test('.setState, .resetState', () =>
  {
    // Regular Case
    const model1 = genFakeModel()
    const t1 = model1.reducers.setState({}, { payload: { wori: 'nimei' } })
    const e1 = { wori: 'nimei' }
    expect(t1).toEqual(e1) // .setState

    // Reset All State
    const t2 = model1.reducers.resetState(model1.state, {})
    const e2 = { shuai: 'ku', mei: 'hehe2' }
    expect(t2).toEqual(e2)

    // Reset One State
    const t3 = model1.reducers.resetState(model1.state, { payload: 'mei' })
    const e3 = { shuai: 'ku', mei: 'hehe2' }
    expect(t3).toEqual(e3)
  })

  test('.setState', () =>
  {
    // Regular Case
    const model = genFakeModel()
    const innerObj = { i: 1 }
    const outerObj = { o: innerObj }
    const t1 = model.reducers.setState({}, genPayload(outerObj)).o
    const e1 = { i: 1 }
    expect(t1).toEqual(e1)
    expect(t1).toBe(innerObj)
  })

  test('.mergeState', () =>
  {
    // Regular Case
    const model = genFakeModel()
    const innerObj = { i: 1 }
    const outerObj = { o: innerObj }
    const t1 = model.reducers.mergeState({}, genPayload(outerObj)).o
    const e1 = { i: 1 }
    expect(t1).toEqual(e1)
    expect(t1).not.toBe(innerObj)
  })

  test('.clearState', () => {
    // Regular Case
    const model = genFakeModel()
    const t1 = model.reducers.clearState({}, {})
    const e1 = {}
    expect(t1).toEqual(e1)
  })

})
