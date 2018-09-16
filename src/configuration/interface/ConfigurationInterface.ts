import { ObjectOf } from '../../rua/type/data'

export default interface ConfigurationInterface
{
  get(key: string): any

  load(config: ObjectOf<any>): void
}
