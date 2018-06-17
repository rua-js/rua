import ValidationRules from '../type/ValidationRules'

interface RulesInterface
{
  all(): ValidationRules

  parseFromString(validationString: string): void
}

export default RulesInterface
