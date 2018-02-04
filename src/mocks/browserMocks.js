//browserMocks.js
var localStorageMock = (function () {
  var store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key]
    },
    clear: function () {
      store = {};
    },
    get length() {
      var i = 0
      for (var item in store) {
        if (Object.prototype.hasOwnProperty.call(store, item)) {
          i++
        }
      }
      return i
    },
    key: function (index) {
      var i = 0
      for (var item in store) {
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