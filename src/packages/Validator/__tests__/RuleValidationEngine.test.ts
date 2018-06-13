import RuleValidationEngine from '../Engine/RuleValidationEngine'
import Rules from '../Engine/Rules'
import { string } from '../Rule'

describe('RuleValidationEngine', () =>
{
  const rve = new RuleValidationEngine()
  rve.setValidators({
    string,
    required: (carry, data, forceTrue) => forceTrue || !!data && carry,
  })

  test('.setValidators, .hasValidator', () =>
  {
    // Correct Case
    const t1 = new Rules('string')
    expect(rve.hasValidator(t1)).toBeTruthy()

    // Wrong Case
    const t2 = new Rules('str')
    expect(rve.hasValidator(t2)).toBeFalsy()
  })

  test('.validate', () =>
  {
    // Correct Case With One Rule
    const t1 = 111
    const rule1 = new Rules('required')
    expect(rve.validate(t1, rule1)).toBeTruthy()

    // Correct Case With Two Rules
    const t2 = '222'
    const rule2 = new Rules('string|required')
    expect(rve.validate(t2, rule2))

    // Wrong Case With One Rule
    const t3 = 333
    const rule3 = new Rules('string')
    expect(rve.validate(t3, rule3)).toBeFalsy()

    // Wrong Case With Two Rule
    const t4 = ''
    const rule4 = new Rules('required|string')
    expect(rve.validate(t4, rule4)).toBeFalsy()

    // With Params Case
    const t5 = false
    const rule5 = new Rules('required:true')
    expect(rve.validate(t5, rule5)).toBeTruthy()
  })

  test('.getUnregisteredValidatorName', () => {
    const rule1 = new Rules('string|hehe|da')
    const e1 = ['hehe', 'da']
    expect(rve.getUnregisteredValidatorName(rule1)).toEqual(e1)
  })
})
