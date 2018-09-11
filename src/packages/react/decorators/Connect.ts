import * as _ from 'lodash'
// @ts-ignore
import { connect } from 'react-redux'

const Connect = (connectFunction: string[] | Function) =>
{
  if (_.isFunction(connectFunction))
  {
    return connect(connectFunction as Function)
  }

  return connect((store: any) =>
  {
    const exportData: any = {}

    for (const mapping of connectFunction as string[])
    {
      const [
        pathOrName,
        pathOptional,
      ] = mapping.split(':')

      // todo: last accessor of path can NOT be array index

      let path: string
      let exportName: string

      if (pathOptional)
      {
        path = pathOptional
        exportName = pathOrName
      } else
      {
        path = pathOrName
        exportName = pathOrName.split('.').pop()!
      }

      exportData[exportName] = _.get(store, path)
    }

    return exportData
  })
}

export default Connect
