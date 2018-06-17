import { RulesInterface } from '../interface'
import { ValidationRules } from '../type'

class Rules implements RulesInterface
{
  protected rules: ValidationRules = []

  constructor(validationString: string)
  {
    this.parseFromString(validationString)
  }

  public all(): ValidationRules
  {
    return this.rules
  }

  public parseFromString(validationString: string): void
  {
    const formattedString: string = validationString.replace(/\s/g, '')

    const rulesStringArray = formattedString.split('|')

    for (const rule of rulesStringArray)
    {
      const [ruleName, stringArgs] = rule.split(':')

      const ruleArgs = stringArgs
        ? stringArgs.split(',')
        : []

      this.rules.push({
        name: ruleName,
        args: ruleArgs,
      })
    }
  }
}

export default Rules
