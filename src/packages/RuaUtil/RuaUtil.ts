import * as invariant from 'invariant'

class RuaUtil {
  public static delay(time: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }

  public static invariant = invariant
}

export default RuaUtil
