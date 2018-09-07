import Cache from '../cache/engine/Cache'
import { EMPTY_OBJECT } from '../shared'
import { AnyObject } from '../core/type/data'
import { ConfigurationInterface } from './interfaces'

class Configuration implements ConfigurationInterface
{
  protected config: AnyObject = EMPTY_OBJECT

  protected cache: Cache = new Cache({ storeName: 'config-' })

  public set(config: AnyObject): void
  {
    this.cache.merge(config)
  }

  public get(key?: string): AnyObject
  {
    if (!key)
    {
      return this.cache.all()
    }

    return this.cache.get(key!) as AnyObject
  }

  public reset(): void
  {
    // this.cache.clear()
  }
}

export default Configuration
