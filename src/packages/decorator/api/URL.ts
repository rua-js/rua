const URL = (url: string) => (target: any, propertyKey: string) =>
{
  if (!target[propertyKey])
  {
    target[propertyKey] = {
      url,
    }

    return target
  }

  target[propertyKey].url = url

  return target
}

export default URL
