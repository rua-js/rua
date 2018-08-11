import StringRules from './StringRules'
import { AnyObject } from '../../core/type/data'
import ValidationFunctionContainer from './ValidationFunctionContainer'

interface ValidatorConfiguration
{
  data: AnyObject

  rules: StringRules

  validators?: ValidationFunctionContainer

  extraValidators?: ValidationFunctionContainer
}

export default ValidatorConfiguration
