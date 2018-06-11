import { AnyObject } from '../../Type/Data'
import ValidationRules from './ValidationRules'
import { DataConvertorEngine, RuleEngine } from '../Engine'

interface ValidatorConfiguration
{
  data: AnyObject

  rules: ValidationRules

  dataTranslator: DataConvertorEngine

  ruleVerifier: RuleEngine
}

export default ValidatorConfiguration
