export default function Action(action: string)
{
  return function (target: any, key: string)
  {
    target[key] = function ()
    {
      // @ts-ignore
      const store = global.reduxStore

      if (!store)
      {
        return console.error('[Decorator]Action required global.reduxStore')
      }

      store.dispatch({
        type: action,
      })
    }
  }
}
