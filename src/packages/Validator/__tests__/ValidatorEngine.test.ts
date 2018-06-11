import ValidatorEngine from '../Engine/ValidatorEngine'

describe('ValidatorEngine', () =>
{

  const validators = {
    string: (data: any) => typeof data === 'string',
    required: (data: any) => !!data,
  }

  test('.fails, .passes', () =>
  {
    // Regular Case
    const t1 = { t1: 'hehe', t2: 'haha' }
    const rule1 = { t1: 'required|string', t2: 'required|string' }
    const ve1 = new ValidatorEngine({
      data: t1,
      rules: rule1,
      extraValidators: validators,
    })
    expect(ve1.fails()).toBeFalsy()
    expect(ve1.passes()).toBeTruthy()
    expect(ve1.hasUnregisteredRule).toBeFalsy()

    // With Unregistered Rule Case
    const t2 = { t1: 'hehe', t2: 'haha' }
    const rule2 = { t1: 'required|string|hehe', t2: 'required|string' }
    const ve2 = new ValidatorEngine({
      data: t2,
      rules: rule2,
      extraValidators: validators,
    })
    expect(ve2.fails()).toBeFalsy()
    expect(ve2.passes()).toBeTruthy()
    expect(ve2.hasUnregisteredRule).toBeTruthy()
  })
})
