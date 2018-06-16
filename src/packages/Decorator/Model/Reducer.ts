const Reducer = resetValue => (target: any, propertyKey) =>
{
  if (!target.__state_)
  {
    target.__state_ = {}
  }

  target.__state_[propertyKey] = target[propertyKey]

  return target
}

export default Reducer
