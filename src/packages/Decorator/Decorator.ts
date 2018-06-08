import { event } from '../Event'
// @ts-ignore
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { ComponentClass } from 'react'

class Decorator
{
  public static Listen(eventName: string | RegExp)
  {
    return (target: any, propertyKey: string): any =>
    {
      // event.on(eventName, target[propertyKey])
      const originalCDM = target['componentDidMount']
      const originalCWU = target['componentWillUnmount']
      const eventCallback = target[propertyKey]

      // override original or create new CDM
      target['componentDidMount'] = () =>
      {
        originalCDM && originalCDM()
        event.on(eventName, eventCallback)
      }

      // override original or create new CWU
      target['componentWillUnmount'] = () =>
      {
        originalCWU && originalCWU()
        event.remove(eventName, eventCallback)
      }

      return target
    }
  }

  public static Connect(connectFunction: string[] | Function)
  {
    if (_.isFunction(connectFunction)) {
      return connect(connectFunction as Function)
    }

    return connect((store: any) => {
      return _.pick(store, connectFunction as string[])
    })
  }
}

export default Decorator
