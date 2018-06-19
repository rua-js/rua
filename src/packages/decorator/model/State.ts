const State = () => (target: any, propertyKey: string) =>
{
  if (!target.__state_)
  {
    target.__state_ = {}
  }

  target.__state_[propertyKey] = target[propertyKey]

  return target
}

export default State
