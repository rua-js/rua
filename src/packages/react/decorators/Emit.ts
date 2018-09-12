import FunctionCollectionDescriptorBuildUtil from '../../util/FunctionCollectionDescriptorBuildUtil'
import Event from '../../event/Event'

export default function Emit(eventName: string): any
{
  return function (target: Object, key: string, descriptor: PropertyDescriptor)
  {
    return FunctionCollectionDescriptorBuildUtil
      .create(
        target,
        key,
        descriptor,
        function (...args: any[])
        {
          Event.emit(eventName, ...args)
        },
      )
  }
}
