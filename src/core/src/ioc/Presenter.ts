import { injectable } from 'inversify'

export default function Presenter(target: Object)
{
  return injectable()(target)
}
