import { Container } from 'inversify'

export default new Container({
  defaultScope: 'Singleton',
  autoBindInjectable: true,
})
