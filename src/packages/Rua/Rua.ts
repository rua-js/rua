import { CanConfig } from 'rua-core/lib/Contracts'
import { AnyObject } from 'rua-core/lib/Types'

/**
 * Rua Class manages/configs all packages
 *
 * @class Rua.js
 */
class Rua implements CanConfig
{

  public configuration = {

  }

  public config(configuration?: AnyObject): Rua
  {
    return this
  }
}