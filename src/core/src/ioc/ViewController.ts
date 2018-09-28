import { injectable } from 'inversify'

export default function ViewController(target: Object)
{
  return injectable()(target)
}
