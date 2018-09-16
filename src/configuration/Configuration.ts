import { ConfigurationInterface } from './interface'
import { ObjectOf } from '../rua/type/data'
import { Util } from '../rua/util'

export default class Configuration implements ConfigurationInterface
{
  protected config: ObjectOf<any> = {}

  public get(key: string): any
  {
    return Util.getObjectValueByPath(this.config, key)
  }

  public load(config: ObjectOf<any>): void
  {
    this.config = config
  }
}
