import { RuleValidatorEngineInterface } from '../interface'
import { AnyData } from '../../core/type/data'
import ValidationFunctionContainer from '../type/ValidationFunctionContainer'
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
      (carry: string[], rule) =>
      {
        const validatorName = rule.name

        if (!this.validators[validatorName])
        {
          carry.push(validatorName)
        }

        return carry
      },
      [],
    )
  }

  public validate(data: AnyData, rules: Rules): boolean
  {
    return rules.all().reduce(
      (carry: boolean, rule) =>
      {
        const validatorName = rule.name

        return this.validators[validatorName].call(this, carry, data, ...rule.args)
      },
      true,
    )
  }
}

export default RuleValidationEngine
