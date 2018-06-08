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
      request('https://reqres.in/API/users')
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      request('https://reqres.in/API/users')
    ).resolves.toHaveProperty('page')
  })

  test('.abort', async () => {
    // case: abort
    await expect(
      (() => {
        let abortFn: any
        const req = request('https://reqres.in/API/users', {
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
      request('https://reqres.in/API/users', {
        timeout: 10,
      })
    ).rejects.toBeInstanceOf(HttpRequestTimeoutException)
  })

  test('404', async () => {
    await expect(
      request('https://reqres.in/404')
    ).rejects.toBeInstanceOf(HttpNotFoundException)
  })

  test('interceptors', async () => {
    const url = 'https://reqres.in/API/users'
    const requestInterceptors = {
      wtf: (req: any) => {
        req.url = url
      }
    }

    request.config({
      requestInterceptors,
    })

    await expect(
      request('https://www.qq.com')
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      request('https://www.qq.com')
    ).resolves.toHaveProperty('page')
  })

  test('before', async () => {
    const url = 'https://reqres.in/API/users'
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