import Rules from '../Type/Rules'

interface RulesInterface
{
  readonly all: Rules

  parseFromString(validationString: string): void
}

export default RulesInterface
