import { Api, Method, POST, PUT, PATCH, GET, DELETE, Body, Jwt, Url } from '../decorator/index'
import { ApiRequest } from '../index'

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
    expect(Method).toBeTruthy()
    expect(GET).toBeTruthy()
    expect(POST).toBeTruthy()
    expect(PATCH).toBeTruthy()
    expect(PUT).toBeTruthy()
    expect(DELETE).toBeTruthy()
  })

  test('Url', () =>
  {
    @Api
    class MyApi
    {
      @Method('POST')
      @Url('www.qq.com')
      public test: any
    }

    expect(ApiRequest.api.all()).toEqual({ MyApi: { test: { method: 'POST', url: 'www.qq.com' } } })
  })

  test('Method', () =>
  {
    @Api
    class MyApi
    {
      @Method('POST')
      public test: any = 'www.qq.com'
    }

    expect(ApiRequest.api.all()).toEqual({ MyApi: { test: { method: 'POST', url: 'www.qq.com' } } })
  })

  test('Methods', () =>
  {
    @Api
    class MyApi
    {
      @GET
      public TestGet: any = 'get.qq.com'

      @POST
      public TestPost: any = 'post.qq.com'

      @PUT
      public TestPut: any = 'put.qq.com'

      @PATCH
      public TestPatch: any = 'patch.qq.com'

      @DELETE
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
      @Body({
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
      @Jwt(randomStr)
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
      @Jwt(randomStr)
      @POST
      @Body({ wode: 1 })
      public test: any = 'www.qq.com'
    }

    expect(ApiRequest.api.all()).toEqual({
      MyApi: {
        test: { headers: { authorization: randomStr }, url: 'www.qq.com', body: { wode: 1 }, method: 'POST' },
      },
    })
  })
})
