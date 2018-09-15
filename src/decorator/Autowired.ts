import 'reflect-metadata'

export default function Autowired(target: any, propertyName: string)
{
  const _class = Reflect.getMetadata('design:type', target, propertyName)

  Object.defineProperty(target, propertyName, {
    enumerable: true,
    get()
    {
      const instance = new _class()

      Object.defineProperty(this, propertyName, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: instance,
      })

      return instance
    },
    set(value)
    {
      this[propertyName] = value
    },
  })
}
