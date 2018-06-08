import { APIConfiguration } from '../../API/Type'
import { RequestConfiguration } from '../../Request/Type'

interface RuaConfiguration
{
  request?
    : RequestConfiguration

  api?: APIConfiguration

  models?: {
    [key: string]: any
  }

  dva?: any
}

export default RuaConfiguration
