export default function Effect(target: any, key: string)
{
  const stateFunction = target[key]

  if ('function' !== typeof stateFunction)
  {
    throw new Error('[RuaX][Dva]@State should apply on a function that returns the state')
  }

  Reflect.defineMetadata('dva:state', stateFunction(), target.constructor)
}
