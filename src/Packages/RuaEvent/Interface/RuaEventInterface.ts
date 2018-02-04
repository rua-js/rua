import RuaEvent from '../RuaEvent'
import { AnyObject } from 'rua-core/lib/Types'
import { MultiEvents } from '../Types'

interface RuaEventInterface {
  on(event: string | RegExp, callback: Function): RuaEventInterface

  once(event: string | RegExp, callback: Function): RuaEventInterface

  emit(event: string | RegExp, ...args: any[]): RuaEventInterface

  remove(event: string | RegExp, callback: Function): RuaEventInterface

  clear(): RuaEventInterface

  get(event: string | RegExp ): AnyObject | Function[]

  all(): AnyObject

  load(events: MultiEvents): RuaEventInterface
}

export default RuaEventInterface
