//browserMocks.js
const localStorageMock = (function () {
  let store: any = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: any) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key]
    },
    clear: function () {
      store = {};
    },
    get length() {
      let i = 0
      for (const item in store) {
        if (Object.prototype.hasOwnProperty.call(store, item)) {
          i+=1
        }
      }
      return i
    },
    key: function (index: number) {
      let i = 0
      for (const item in store) {
        if (Object.prototype.hasOwnProperty.call(store, item)) {
          if (index === i) {
            return item
          }
          i++
        }
      }
      return i
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});