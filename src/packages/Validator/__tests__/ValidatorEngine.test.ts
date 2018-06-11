import { ValidatorEngine } from '../Engine'
import { StringRules } from '../Type'
import { AnyObject } from '../../Type/Data'

describe('ValidatorEngine', () =>
{

  const validators = {
    string: (data: any) => typeof data === 'string',
    required: (data: any) => !!data,
  }

  test('.fails, .passes', () =>
  {
    // Correct Regular Case
    const t1: AnyObject = { t1: 'hehe', t2: 'haha' }
    const rule1: StringRules = { t1: 'required|string', t2: 'required|string' }
    const ve1 = new ValidatorEngine({
      data: t1,
      rules: rule1,
      extraValidators: validators,
    })
    expect(ve1.fails()).toBeFalsy()
    expect(ve1.passes()).toBeTruthy()
    expect(ve1.hasUnregisteredRule).toBeFalsy()

    // Wrong Case With One Failure
    const t2: AnyObject = { t1: '' }
    const rule2: StringRules = { t1: 'required|string' }
    const ve2 = new ValidatorEngine({
      data: t2,
      rules: rule2,
      extraValidators: validators,
    })
    expect(ve2.fails()).toBeTruthy()
    expect(ve2.passes()).toBeFalsy()
    expect(ve1.hasUnregisteredRule).toBeFalsy()

    // Wrong Case With Two Failures
    const t3: AnyObject = { t2: false }
    const rule3: StringRules = { t2: 'required|string' }
    const ve3 = new ValidatorEngine({
      data: t3,
      rules: rule3,
      extraValidators: validators,
    })
    expect(ve3.fails()).toBeTruthy()
    expect(ve3.passes()).toBeFalsy()
    expect(ve1.hasUnregisteredRule).toBeFalsy()

    // With Unregistered Rule Case
    const t4: AnyObject = { t1: 'hehe', t4: 'haha' }
    const rule4: StringRules = { t1: 'required|string|hehe', t4: 'required|string' }
    const ve4 = new ValidatorEngine({
      data: t4,
      rules: rule4,
      extraValidators: validators,
    })
    expect(ve4.fails()).toBeFalsy()
    expect(ve4.passes()).toBeTruthy()
    expect(ve4.hasUnregisteredRule).toBeTruthy()

    // With Not Defined Data Property Case
    const t5: AnyObject = { t1: 111 }
    const rule5: StringRules = { t2: 'required' }
    const ve5 = new ValidatorEngine({
      data: t5,
      rules: rule5,
      extraValidators: validators,
    })
    expect(ve5.fails()).toBeTruthy()
    expect(ve5.passes()).toBeFalsy()
    expect(ve1.hasUnregisteredRule).toBeFalsy()

    // Empty Rule
    const t6: AnyObject = { t1: 111 }
    const rule6: any = { t3: undefined }
    const ve6 = new ValidatorEngine({
      data: t6,
      rules: rule6,
      extraValidators: validators,
    })

    expect(ve6.fails()).toBeFalsy()
    expect(ve6.passes()).toBeTruthy()
  })
})
