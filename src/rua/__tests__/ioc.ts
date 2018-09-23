import { Container, Autowired, Component } from '../ioc'

describe('Rua IOC Test', () => {
  const fakeFn = jest.fn()

  @Component
  class MyComponent {
    public test()
    {
      fakeFn(133)
    }
  }

  // Container.bind(MyComponent).toSelf()

  test('t', () => {
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

    new MyTestClass().go()

    expect(fakeFn.mock.calls.length).toBe(1)
  })
})
