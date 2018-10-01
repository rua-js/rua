import { injectable } from 'inversify'

export default function ViewModel(target: Object)
{
  return injectable()(target)
}
