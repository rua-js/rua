import { APIConfiguration } from '../../API/Type'
import { RequestConfiguration } from '../../request/Type'

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
