import Rules from './Rules'
import DataConvertorEngine from './DataConvertorEngine'
import RuleValidationEngine from './RuleValidationEngine'
import { StringRules, ValidatorConfiguration } from '../type'
import { ValidatorEngineInterface } from '../interface'
import { AnyObject } from '../../type/data'
import { CanConfig } from '../../type/contract'

class ValidatorEngine implements ValidatorEngineInterface, CanConfig
{
  public failedRules: string[] = []
  public failedMessages: string[] = []
  public unregisteredRules: string[] = []
  public hasUnregisteredRule = false
  protected ruleValidator: RuleValidationEngine = new RuleValidationEngine()
  protected dataTranslator: DataConvertorEngine = new DataConvertorEngine()
  protected rules: StringRules = {}
  protected data: AnyObject = {}
  protected isValid: boolean = true
  protected isFixed: boolean = false

  public constructor(config: ValidatorConfiguration)
  {
    this.config(config)
  }

  public config(config: ValidatorConfiguration): void
  {
    const {
      data,
      rules,
      validators,
      extraValidators,
    } = config

    this.data = data
    this.rules = rules
    this.ruleValidator.setValidators({ ...validators, ...extraValidators })
  }

  public validate(): void
  {
    // data loop
    for (const ruleKey in this.rules)
    {
      const ruleString = this.rules[ruleKey]

      if (!ruleString)
      {
        continue
      }

      const data = this.data[ruleKey]
      const rule = new Rules(ruleString)

      if (!this.ruleValidator.hasValidator(rule))
      {
        this.hasUnregisteredRule = true
        continue
      }

      this.isValid = this.isValid && this.ruleValidator.validate(data, rule)
    }
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
