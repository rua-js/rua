import { ApiConfiguration } from '../../Api/Type'
import { RequestConfiguration } from '../../Request/Type'

interface RuaConfiguration
{
  request: RequestConfiguration

  api?: {
    [key: string]: ApiConfiguration
  }

  models?: {
    [key: string]: any
  }


  dva?: any
}

export default RuaConfiguration
