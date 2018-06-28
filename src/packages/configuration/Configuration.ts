import Cache from '../cache/engine/Cache'
import { emptyObject } from '../shared'
import { AnyObject } from '../type/data'
import { ConfigurationInterface } from './interfaces'

class Configuration implements ConfigurationInterface
{
  protected config: AnyObject = emptyObject

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
