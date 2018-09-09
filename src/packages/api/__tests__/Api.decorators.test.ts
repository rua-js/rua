import { default as Api } from '../decorators'
import { ApiRequest } from '../'

describe('Api Decorators Tests', () =>
{
  beforeEach(() =>
  {
    ApiRequest.api.clear()
  })

  test('api', () =>
  {
    // no given name
    @Api
    class ClassName
    {
    }

    @Api
    class ccName2
    {
      public static getName()
      {
        return 'className2'
      }
    }

    @Api
    class ccName3
    {
      public static getName = 'className3'
    }

    expect(ClassName).toEqual({ classname: {} })
    expect(ccName2).toEqual({ className2: {} })
    expect(ccName3).toEqual({ className3: {} })
  })

  test('export correctly', () =>
  {
    expect(Api).toBeTruthy()

    // methods
    expect(Api.Method).toBeTruthy()
    expect(Api.GET).toBeTruthy()
    expect(Api.POST).toBeTruthy()
    expect(Api.PATCH).toBeTruthy()
    expect(Api.PUT).toBeTruthy()
    expect(Api.DELETE).toBeTruthy()
  })

  test('Method', () =>
  {
    @Api
    class MyApi
    {
      @Api.Method('POST')
      public test: any = 'www.qq.com'
    }

    expect(ApiRequest.api.all()).toEqual({ myapi: { test: { method: 'POST', url: 'www.qq.com' } } })
  })

  test('Methods', () =>
  {
    @Api
    class MyApi
    {
      @Api.GET
      public testGet: any = 'get.qq.com'

      @Api.POST
      public testPost: any = 'post.qq.com'

      @Api.PUT
      public testPut: any = 'put.qq.com'

      @Api.PATCH
      public testPatch: any = 'patch.qq.com'

      @Api.DELETE
      public testDelete: any = 'delete.qq.com'
    }

    expect(ApiRequest.api.all()).toEqual({
      myapi: {
        testPost: { method: 'POST', url: 'post.qq.com' },
        testGet: { method: 'GET', url: 'get.qq.com' },
        testPut: { method: 'PUT', url: 'put.qq.com' },
        testPatch: { method: 'PATCH', url: 'patch.qq.com' },
        testDelete: { method: 'DELETE', url: 'delete.qq.com' },
      },
    })
  })

  test('Body', () =>
  {
    @Api
    class MyApi
    {
      @Api.Body({
        myBody: 133,
      })
      public test: any = 'www.qq.com'
    }

    expect(ApiRequest.api.all()).toEqual({
      myapi: {
        test: { body: { myBody: 133 }, url: 'www.qq.com' },
      },
    })
  })

  test('Jwt', () =>
  {
    const randomStr = 'rua fasuudru23rjlasdnfoq32ifnqlfafqieflsj;'

    @Api
    class MyApi
    {
      @Api.Jwt(randomStr)
      public test: any = 'www.qq.com'
    }

    expect(ApiRequest.api.all()).toEqual({
      myapi: {
        test: { headers: { authorization: randomStr }, url: 'www.qq.com' },
      },
    })
  })

  test('All-in-one', () =>
  {
    const randomStr = 'rua fasuudru23rjlasdnfoq32ifnqlfafqieflsj;'

    @Api
    class MyApi
    {
      @Api.Jwt(randomStr)
      @Api.POST
      @Api.Body({ wode: 1 })
      public test: any = 'www.qq.com'
    }

    expect(ApiRequest.api.all()).toEqual({
      myapi: {
        test: { headers: { authorization: randomStr }, url: 'www.qq.com', body: { wode: 1 }, method: 'POST' },
      },
    })
  })
})
