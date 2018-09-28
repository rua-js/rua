import { ApplicationContext, Autowired, Component, Service, ViewController, Controller } from '../'

describe('Rua IOC Test', () =>
{
  const fakeFn = jest.fn()

  @Component
  class MyComponent
  {
    public test()
    {
      fakeFn(133)
    }
  }

  @Service
  class MyService
  {
    public test()
    {
      fakeFn(244)
    }
  }

  test('export correctly', () => {
    expect(ApplicationContext).toBeTruthy()
    expect(Autowired).toBeTruthy()
    expect(Component).toBeTruthy()
    expect(Service).toBeTruthy()
    expect(Controller).toBeTruthy()
    expect(ViewController).toBeTruthy()
  })

  test('Annotation Autowired with Component', () =>
  {
    @Component
    class MyTestClass
    {
      @Autowired
      // @ts-ignore
      private myComponent: MyComponent

      public go()
      {
        this.myComponent.test()
      }
    }

    ApplicationContext.get(MyTestClass).go()

    expect(fakeFn.mock.calls.length).toBe(1)
    expect(fakeFn.mock.calls[0].length).toBe(1)
    expect(fakeFn.mock.calls[0][0]).toBe(133)
  })

  test('Annotation Autowired with Service', () =>
  {
    @Service
    class MyTestClass
    {
      @Autowired
      // @ts-ignore
      private myComponent: MyComponent

      public go()
      {
        this.myComponent.test()
      }
    }

    ApplicationContext.get(MyTestClass).go()

    expect(fakeFn.mock.calls.length).toBe(2)
    expect(fakeFn.mock.calls[1].length).toBe(1)
    expect(fakeFn.mock.calls[1][0]).toBe(133)
  })
})
