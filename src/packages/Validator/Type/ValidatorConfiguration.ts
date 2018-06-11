import StringRules from './StringRules'
import { DataConvertorEngine, RuleValidationEngine } from '../Engine'
import { AnyObject } from '../../Type/Data'

interface ValidatorConfiguration
{
  data: AnyObject

  rules: StringRules

  dataTranslator: DataConvertorEngine

  ruleValidator: RuleValidationEngine
}

export default ValidatorConfiguration
