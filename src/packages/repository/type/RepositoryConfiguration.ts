import RepositoryHooks from './RepositoryHooks'

interface RepositoryConfiguration
{
  shouldDeepClone?: boolean
  hooks?: RepositoryHooks
}

export default RepositoryConfiguration
