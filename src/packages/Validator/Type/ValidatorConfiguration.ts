import StringRules from './StringRules'
import { DataConvertorEngine } from '../Engine'
import { RuleValidatorEngine } from '../Engine'
import { AnyObject } from '../../Type/Data'

interface ValidatorConfiguration
{
  data: AnyObject

  rules: StringRules

  dataTranslator: DataConvertorEngine

  ruleValidator: RuleValidatorEngine
}

export default ValidatorConfiguration
