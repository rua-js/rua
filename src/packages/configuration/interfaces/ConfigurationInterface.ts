import { AnyObject } from '../../type/data'

interface ConfigurationInterface
{
  set(config: AnyObject): void

  get(key?: string): AnyObject

  reset(): void
}

export default ConfigurationInterface
