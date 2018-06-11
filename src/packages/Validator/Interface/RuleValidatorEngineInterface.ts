import { Rules } from '../Engine'
import { ValidationFunctionContainer } from '../Type'
import { AnyData } from '../../Type/Data'

interface RuleValidatorEngineInterface
{
  setValidators(validators: ValidationFunctionContainer): void

  hasValidator(rules: Rules): boolean

  getUnregisteredValidatorName(rules: Rules): string[]

  validate(data: AnyData, rules: Rules): boolean
}

export default RuleValidatorEngineInterface
