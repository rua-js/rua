import Freeze from './Freeze'
import Listen from './Listen'
import Connect from './Connect'
import Instance from './Instance'
import Api from './Api'
import AutoBind from './AutoBind'
import CallProp from './CallProp'
import CallPropHOF from './CallPropHOF'

const Decorator = {
  Listen,
  Connect,
  Instance,
  API: Api,
  AutoBind,
}

export {
  Decorator,
  Freeze,
  Listen,
  Connect,
  Instance,
  AutoBind,
  CallProp,
  CallPropHOF,
}
