import AnyData from '../../Type/Data/AnyData'

interface RuleEngineInterface
{
  hasValidator(validator?: string): boolean
  validate(data: AnyData, validator: string): boolean
}

export default RuleEngineInterface
