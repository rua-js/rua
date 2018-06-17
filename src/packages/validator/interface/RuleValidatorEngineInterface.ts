import { Rules } from '../engine'
import { ValidationFunctionContainer } from '../type'
import { AnyData } from '../../type/data'

interface RuleValidatorEngineInterface
{
  setValidators(validators: ValidationFunctionContainer): void

  hasValidator(rules: Rules): boolean

  getUnregisteredValidatorName(rules: Rules): string[]

  validate(data: AnyData, rules: Rules): boolean
}

export default RuleValidatorEngineInterface
