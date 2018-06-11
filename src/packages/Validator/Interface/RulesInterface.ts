import ValidationRules from '../Type/ValidationRules'

interface RulesInterface
{
  all(): ValidationRules

  parseFromString(validationString: string): void
}

export default RulesInterface
