import { Event } from '../event'

const Listen = (eventName: string | RegExp) =>
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
      Event.on(eventName, eventCallback)
    }

    // override original or create new CWU
    target['componentWillUnmount'] = () =>
    {
      originalCWU && originalCWU()
      Event.remove(eventName, eventCallback)
    }

    return target
  }
}

export default Listen
