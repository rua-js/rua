import {
  Request,
} from '../index'

import {
  HttpAbortException,
  HttpRequestTimeoutException,
  HttpNotFoundException,
} from '../../exception'

jest.setTimeout(10000)

describe('Request tests', () =>
{
  test('request', async () =>
  {
    // case: success
    await expect(
      new Request('https://reqres.in/api/users'),
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      new Request('https://reqres.in/api/users'),
    ).resolves.toHaveProperty('page')
  })

  test('.abort', () =>
  {
    let instance: any
    // case: abort
    const req = new Request('https://reqres.in/api/users', {}, {
      before(req: any)
      {
        instance = req
      },
    })
    instance.abort()
    expect(instance._aborted).toBeTruthy()
  })

  test('timeout', async () =>
  {
    // case: timeout
    await expect(
      new Request('https://reqres.in/api/users', undefined, {
        timeout: 10,
      }),
    ).rejects.toBeInstanceOf(HttpRequestTimeoutException)
  })

  test('404', async () =>
  {
    await expect(
      new Request('https://reqres.in/404'),
    ).rejects.toBeInstanceOf(HttpNotFoundException)
  })

  test('request interceptors', async () =>
  {
    const url = 'https://reqres.in/api/users'
    const requestInterceptors = {
      wtf: (req: any) =>
      {
        req.url.setUrl(url)
      },
    }

    Request.config({
      requestInterceptors,
    })

    await expect(
      new Request('https://www.qq.com'),
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      new Request('https://www.qq.com'),
    ).resolves.toHaveProperty('page')
  })

  test('before', async () =>
  {
    const url = 'https://reqres.in/api/users'
    const before = (req: any) =>
    {
      req.url = url
    }

    await expect(
      new Request('https://www.qq.com', {}, { before }),
    ).resolves.toBeInstanceOf(Object)
    // case: correct data
    await expect(
      new Request('https://www.qq.com', {}, { before }),
    ).resolves.toHaveProperty('page')
  })
})
