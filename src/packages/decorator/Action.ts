export default function Action(action: string)
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

      store.dispatch({
        type: action,
      })
    }
  }
}
