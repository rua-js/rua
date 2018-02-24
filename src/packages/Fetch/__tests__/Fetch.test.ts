import {
  fetch,
} from '../index'

import {
  HttpAbortException,
  HttpRequestTimeoutException,
  HttpNotFoundException,
} from '../../Exception'

describe('Fetch', () => {
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
    // case: abort
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
    ).rejects.toBeInstanceOf(HttpAbortException)
  })

  test('timeout', async () => {
    // case: timeout
    await expect(
      fetch('https://reqres.in/api/users', {
        timeout: 10,
      })
    ).rejects.toBeInstanceOf(HttpRequestTimeoutException)
  })

  test('404', async () => {
    await expect(
      fetch('https://reqres.in/404')
    ).rejects.toBeInstanceOf(HttpNotFoundException)
  })
})