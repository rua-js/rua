import 'reflect-metadata'
import Container from './Container'

import { Container } from '@ruax/ioc'
export default function Autowired(target: Object, key: string): any
{
  const _class = Reflect.getMetadata('design:type', target, key)

  // inject(_class)(target, key)

  return {
    enumerable: true,
    configurable: true,
    get()
    {
      const injection = Container.get(_class)

      Object.defineProperty(target, key, {
        writable: true,
        value: injection,
      })

      return injection
    },
  }
}
