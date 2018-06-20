import Factory from '../../../dev/factory/Factory'
import APIEntityObjectCollection from './APIEntityObjectCollection'

interface APIConfiguration {
  data?: {
    [namespace: string]: APIEntityObjectCollection,
  },
  factory?: Factory
  useFactoryOnProduction?: boolean
}

export default APIConfiguration
