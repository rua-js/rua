import { ApiConfiguration } from '../../API/Type'
import { RequestConfiguration } from '../../Request/Type'

interface RuaConfiguration
{
  request?
    : RequestConfiguration

  api?: ApiConfiguration

  models?: {
    [key: string]: any
  }

  dva?: any
}

export default RuaConfiguration
