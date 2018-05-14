import {
  request,
} from '../index'

import {
  HttpAbortException,
  HttpRequestTimeoutException,
  HttpNotFoundException,
} from '../../Exception'

describe('Request', () => {
  test('request', async () => {
    // case: success
    await expect(
      request('https://reqres.in/api/users')
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      request('https://reqres.in/api/users')
    ).resolves.toHaveProperty('page')
  })

  test('.abort', async () => {
    // case: abort
    await expect(
      (() => {
        let abortFn: any
        const req = request('https://reqres.in/api/users', {
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
      request('https://reqres.in/api/users', {
        timeout: 10,
      })
    ).rejects.toBeInstanceOf(HttpRequestTimeoutException)
  })

  test('404', async () => {
    await expect(
      request('https://reqres.in/404')
    ).rejects.toBeInstanceOf(HttpNotFoundException)
  })

  test('before', async () => {
    const url = 'https://reqres.in/api/users'
    const before = (req: any) => {
      req.url = url
    }

    await expect(
      request('https://www.qq.com', { before })
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      request('https://www.qq.com', { before })
    ).resolves.toHaveProperty('page')
  })
})