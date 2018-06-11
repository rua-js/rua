import { RuleValidatorEngineInterface } from '../Interface'
import AnyData from '../../Type/Data/AnyData'
import ValidationFunctionContainer from '../Type/ValidationFunctionContainer'
import Rules from './Rules'

class RuleValidationEngine implements RuleValidatorEngineInterface
{
  protected validators: ValidationFunctionContainer = {}

  public setValidators(validators: ValidationFunctionContainer): void
  {
    this.validators = validators
  }

  public hasValidator(rules: Rules): boolean
  {
    return rules.all().reduce(
      (result, rule) =>
      {
        const validatorName = rule.name

        return result && !!this.validators[validatorName]
      },
      true,
    )
  }

  public getUnregisteredValidatorName(rules: Rules): string[]
  {
    return rules.all().reduce(
      (result: string[], rule) =>
      {
        const validatorName = rule.name

        if (!!this.validators[validatorName])
        {
          result.push(validatorName)
        }

        return result
      },
      [],
    )
  }

  public validate(data: AnyData, rules: Rules): boolean
  {
    return rules.all().reduce(
      (result, rule) =>
      {
        const validatorName = rule.name

        return result && this.validators[validatorName].call(this, data, ...rule.args)
      },
      true,
    )
  }
}

export default RuleValidationEngine
