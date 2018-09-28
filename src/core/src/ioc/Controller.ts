import { injectable } from 'inversify'

export default function Controller(target: Object)
{
  return injectable()(target)
}
