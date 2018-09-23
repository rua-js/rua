export function isObject(obj: any)
{
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj: any)
{
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}
