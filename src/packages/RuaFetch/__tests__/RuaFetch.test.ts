import {
  fetch,
} from '../index'
import * as _ from 'lodash'
import { Exception } from '../../RuaException'

describe('RuaFetch', () => {
  test('fetch', async () => {
    // case: success
    await expect(
      fetch('https://reqres.in/api/users')
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      fetch('https://reqres.in/api/users')
    ).resolves.toHaveProperty('page')
  })

  test('.abort', async () => {
    await expect(
      (() => {
        let abortFn: any
        const req = fetch('https://reqres.in/api/users', {
          before(req: any) {
            abortFn = req
          },
        })
        abortFn.abort()
        return req
      })()
    ).rejects.toBeInstanceOf(Exception)
  })
})