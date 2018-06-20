// browserMocks.js
const localStorageMock = (function ()
{
  let store: any = {}

  return {
    getItem(key: string)
    {
      return store[key] || null
    },
    setItem(key: string, value: any)
    {
      store[key] = value.toString()
    },
    removeItem(key: string)
    {
      delete store[key]
    },
    clear()
    {
      store = {}
    },
    get length()
    {
      let i = 0
      for (const item in store)
      {
        if (Object.prototype.hasOwnProperty.call(store, item))
        {
          i += 1
        }
      }

      return i
    },
    key(index: number)
    {
      let i = 0
      for (const item in store)
      {
        if (Object.prototype.hasOwnProperty.call(store, item))
        {
          if (index === i)
          {
            return item
          }
          i += 1
        }
      }

      return null
    },
  }
})()

// @ts-ignore
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
