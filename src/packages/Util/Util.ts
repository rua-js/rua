import * as invariant from 'invariant'
import * as _ from 'lodash'

class Util {
  public static delay(time: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }

  public static invariant = invariant

  public static get language() {
    // @ts-ignore: fix IE language
    return window && window.navigator && (window.navigator.language || window.navigator.browserLanguage)
  }
}

export default Util
