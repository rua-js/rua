import ValidationFunctionContainer from '../Type/ValidationFunctionContainer'
import AnyData from '../../Type/Data/AnyData'

interface ValidationEngineInterface
{
  setValidators(validators: ValidationFunctionContainer): void

  hasValidator(validator: string): boolean

  validate(data: AnyData, validator: string): boolean
}

export default ValidationEngineInterface
