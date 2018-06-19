import APIEntityObjectCollection from './APIEntityObjectCollection'

interface APIConfiguration {
  data?: {
    [namespace: string]: APIEntityObjectCollection,
  },
}

export default APIConfiguration
