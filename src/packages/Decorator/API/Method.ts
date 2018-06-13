const Method = (method: string) => (target: any, propertyKey: string) =>
{
  if (!target[propertyKey])
  {
    target[propertyKey] = {
      method,
    }

    return target
  }

  target[propertyKey].method = method

  return target
}

export default Method
