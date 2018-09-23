import { injectable } from 'inversify'

export default function Service(target: Object)
{
  return injectable()(target)
}
