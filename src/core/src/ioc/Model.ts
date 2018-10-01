import { injectable } from 'inversify'

export default function Model(target: Object)
{
  return injectable()(target)
}
