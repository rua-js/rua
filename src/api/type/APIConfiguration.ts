import Factory from '../../../dev/factory/Factory'
import ApiEntityObjectCollection from './APIEntityObjectCollection'

interface APIConfiguration {
  data?: {
    [namespace: string]: ApiEntityObjectCollection,
  },
  factory?: Factory
  useFactoryOnProduction?: boolean
}

export default APIConfiguration
