import { AnyObject } from 'rua-core/lib/Types'
import { MultiEvents } from '../type'

interface EventInterface {
  on(event: string | RegExp, callback: Function): EventInterface

  once(event: string | RegExp, callback: Function): EventInterface

  emit(event: string | RegExp, ...args: any[]): EventInterface

  remove(event: string | RegExp, callback: Function): EventInterface

  clear(): EventInterface

  get(event: string | RegExp ): AnyObject | Function[]

  all(): AnyObject

  load(events: MultiEvents): EventInterface
}

export default EventInterface
