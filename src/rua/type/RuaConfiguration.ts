import { APIConfiguration } from '../../api/type'
import { RequestConfiguration } from '../../request/type'

interface RuaConfiguration
{
  request?
    : RequestConfiguration

  api?: APIConfiguration

  models?: {
    [key: string]: any,
  }

  dva?: any
}

export default RuaConfiguration
