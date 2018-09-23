import { injectable } from 'inversify'

export default function Component(target: Object)
{
  return injectable()(target)
}
