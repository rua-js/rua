import 'reflect-metadata'
import { inject } from 'inversify'

export default function Autowired(target: Object, key: string): any
{
  const _class = Reflect.getMetadata('design:type', target, key)

  return inject(_class)(target, key)
}
