import API from '../API'
import { API as APIEngine } from '../../API'

const {
  Method,
  Form,
  URL,
} = API

describe('Decorator API', () =>
{
  test('API', async () =>
  {
    // Regular Case
    class test
    {
      public go: string = 'https://reqres.in/API/users'
    }

    expect(API()(test)).toBeTruthy()

    // Real Case
    await expect(APIEngine('test.go')).resolves.toBeInstanceOf(Object)
    await expect(APIEngine('test.go')).resolves.toHaveProperty('page')
  })

  test('Method', () =>
  {
    class T
    {
      @Method('post')
      public P: any
    }

    const t1 = new T().P
    const e1 = { method: 'post' }
    expect(t1).toEqual(e1)
  })

  test('URL', () =>
  {
    class T
    {
      @URL('www.qq.com')
      public P: any
    }

    const t1 = new T().P
    const e1 = { url: 'www.qq.com' }
    expect(t1).toEqual(e1)
  })

  test('Form', () =>
  {
    class T
    {
      @Form()
      public P: any
    }

    const t1 = new T().P
    const e1 = { form: true }
    expect(t1).toEqual(e1)
  })
})
