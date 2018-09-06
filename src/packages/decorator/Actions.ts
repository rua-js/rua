export default function Action(actions: string[])
{
  // @ts-ignore
  const store = global.reduxStore

  return function (target: any, key: string)
  {
    target[key] = function ()
    {
      if (!store)
      {
        console.error('[Decorator]Action required global.reduxStore')
      }

      actions.forEach(action => store.dispatch({
        type: action,
      }))
    }
  }
}
