import RepositoryHooks from './RepositoryHooks'

interface RepositoryConfiguration
{
  deepClone?: boolean
  hooks?: RepositoryHooks
}

export default RepositoryConfiguration
