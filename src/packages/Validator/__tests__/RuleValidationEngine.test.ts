import RuleValidationEngine from '../Engine/RuleValidationEngine'
import Rules from '../Engine/Rules'

describe('RuleValidationEngine', () =>
{
  const rve = new RuleValidationEngine()
  rve.setValidators({
    string: () => true,
    required: (data, forceTrue) => forceTrue || !!data,
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
    // Regular Case
    const t1 = 111
    const rule1 = new Rules('required')
    expect(rve.validate(t1, rule1)).toBeTruthy()

    // With Params Case
    const t2 = false
    const rule2 = new Rules('required:true')
    expect(rve.validate(t2, rule2)).toBeTruthy()
  })
})
