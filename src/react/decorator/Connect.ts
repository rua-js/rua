// @ts-ignore
import { connect } from 'react-redux'

export default function Connect(connectFunction: Function)
{
  if (__DEV__)
  {
    forbidDirectStorePassDown(connectFunction)
  }

  return connect(connectFunction as Function)
}

function forbidDirectStorePassDown(connectFunction: Function)
{
  const obj = {}

  const result = connectFunction(obj)

  if (result === obj || result.store === obj)
  {
    throw new Error('[RuaX]Direct pass store down to component is strictly FORBIDDEN')
  }
}
