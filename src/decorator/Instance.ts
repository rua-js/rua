export interface ClassInt<T>
{
  storeName: any

  prototype: any

  new(...args: any[]): T

  [key: string]: any
}

export interface Test
{
  [key: string]: any
}

function Instance<T>(
  _class: new () => T,
): T
{
  return <T>new _class()
}

export default Instance
