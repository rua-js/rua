// @ts-ignore
import { connect } from 'react-redux'
import { ComponentClass } from 'react'

export default function Connect(connectFunction: Function): ComponentClass
{
  if (__DEV__)
  {
    forbidDirectStorePassDown(connectFunction)
  }

  return connect(connectFunction)
}

function forbidDirectStorePassDown(connectFunction: Function): void
{
  const obj = {}

  const result = connectFunction(obj)

  if (result === obj || result.store === obj)
  {
    throw new Error('[RuaX][Decorator: Connect]Direct pass store down to component is strictly FORBIDDEN')
  }
}
