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
      public static className()
      {
        return 'ClassName2'
      }
    }

    @Api
    class ccName3
    {
      public static className = 'ClassName3'
    }

    expect(ClassName).toEqual({ ClassName: {} })
    expect(ccName2).toEqual({ ClassName2: {} })
    expect(ccName3).toEqual({ ClassName3: {} })
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

    expect(ApiRequest.api.all()).toEqual({ MyApi: { test: { method: 'POST', url: 'www.qq.com' } } })
  })

  test('Methods', () =>
  {
    @Api
    class MyApi
    {
      @Api.GET
      public TestGet: any = 'get.qq.com'

      @Api.POST
      public TestPost: any = 'post.qq.com'

      @Api.PUT
      public TestPut: any = 'put.qq.com'

      @Api.PATCH
      public TestPatch: any = 'patch.qq.com'

      @Api.DELETE
      public TestDelete: any = 'delete.qq.com'
    }

    expect(ApiRequest.api.all()).toEqual({
      MyApi: {
        TestPost: { method: 'POST', url: 'post.qq.com' },
        TestGet: { method: 'GET', url: 'get.qq.com' },
        TestPut: { method: 'PUT', url: 'put.qq.com' },
        TestPatch: { method: 'PATCH', url: 'patch.qq.com' },
        TestDelete: { method: 'DELETE', url: 'delete.qq.com' },
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
      MyApi: {
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
      MyApi: {
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
      MyApi: {
        test: { headers: { authorization: randomStr }, url: 'www.qq.com', body: { wode: 1 }, method: 'POST' },
      },
    })
  })
})
