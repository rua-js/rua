import { RulesInterface } from '../Interface'
import { ValiationRules } from '../Type'

class Rules implements RulesInterface
{
  protected rules: ValiationRules = []

  constructor(validationString: string)
  {
    this.parseFromString(validationString)
  }

  public all(): ValiationRules
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
