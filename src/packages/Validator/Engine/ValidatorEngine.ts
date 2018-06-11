import RuleEngine from './RuleEngine'
import DataConvertorEngine from './DataConvertorEngine'
import { ValidationRules, ValidatorConfiguration } from '../Type'
import { ValidatorEngineInterface } from '../Interface'
import { AnyObject } from '../../Type/Data'

class ValidatorEngine implements ValidatorEngineInterface
{
  protected ruleVerifier: RuleEngine

  protected dataTranslator: DataConvertorEngine

  protected rules: ValidationRules

  protected data: AnyObject

  protected failedRules = []

  protected failedMessages = []

  protected unregistedRules = []

  protected isValid = false

  protected isFixed = false

  constructor(config: ValidatorConfiguration)
  {
    const {
      data,
      rules,
      dataTranslator = new DataConvertorEngine(),
      ruleVerifier = new RuleEngine(),
    } = config
    this.data = data
    this.rules = rules
    this.dataTranslator = dataTranslator
    this.ruleVerifier = ruleVerifier
  }

  public validate(): void
  {

  }

  public fails(): boolean
  {
    this.validate()

    return !this.isValid && !this.isFixed
  }

  public passes(): boolean
  {
    this.validate()

    return this.isValid || this.isFixed
  }
}

export default ValidatorEngine
