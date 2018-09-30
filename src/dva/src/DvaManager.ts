import { Component } from '@ruax/core'

@Component
export default class DvaManager
{
  public dvaAction: any = {}

  protected dvaModelList: Object[] = []

  protected getNamespace(module: any)
  {
    return module.namespace
  }

  protected getReducers(module: any)
  {
    return module.reducers
  }

  protected getEffects(module: any)
  {
    return module.effects
  }

  protected registerNamespace(namespace: string)
  {
    if (this.dvaAction[namespace])
    {
      console.warn(`[RuaX][DvaManager]namespace '${namespace}' is already registered`)
    }

    this.dvaAction[namespace] = {}
  }

  protected registerAction(namespace: string, actionName: string)
  {
    this.dvaAction[namespace][actionName] = function (payload: any, extra: any)
    {
      // @ts-ignore
      if (!global.reduxStore)
      {
        throw new Error('[RuaX][Dva]Please provide redux store to global.reduxStore')
      }

      // @ts-ignore
      global.reduxStore.dispatch({
        payload,
        extra,
        type: `${namespace}/${actionName}`,
      })
    }
  }

  protected registerActionObject(namespace: string, actionObject: any)
  {
    for (const actionName in actionObject)
    {
      this.registerAction(namespace, actionName)
    }
  }

  public register(module: Object)
  {
    this.dvaModelList.push(module)

    const namespace = this.getNamespace(module)

    this.registerNamespace(namespace)

    this.registerActionObject(namespace, this.getReducers(module))

    this.registerActionObject(namespace, this.getEffects(module))
  }

  public get()
  {
    return [...this.dvaModelList]
  }
}
