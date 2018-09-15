import FunctionCollectionDescriptorBuildUtil from '../../rua/util/FunctionCollectionDescriptorBuildUtil'
import Event from '../../event/Event'

const mountingPropertyKey = 'componentDidMount'
const unmountingPropertyKey = 'componentWillUnmount'
const createDesc = FunctionCollectionDescriptorBuildUtil.create

export default function Listen(eventName: string)
{
  return function (target: Object, key: string)
  {
    const mountDesc = createDesc(
      target,
      mountingPropertyKey,
      undefined,
      function ()
      {
        // @ts-ignore
        Event.on(eventName, this[key])
      },
    )
    Object.defineProperty(target, mountingPropertyKey, mountDesc)

    const unmountDesc = createDesc(
      target,
      unmountingPropertyKey,
      undefined,
      function ()
      {
        // @ts-ignore
        Event.remove(eventName, this[key])
      },
    )
    Object.defineProperty(target, unmountingPropertyKey, unmountDesc)
  }
}
