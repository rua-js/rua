export function assert(condition: boolean, message: string)
{
  // assert only in Dev mode
  if (!__DEV__)
  {
    return
  }

  if (condition)
  {
    return
  }

  console.error(message)
}
