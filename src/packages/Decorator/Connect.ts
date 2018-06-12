import * as _ from 'lodash'
// @ts-ignore
import { connect } from 'react-redux'

const Connect = (connectFunction: string[] | Function) =>
{
  if (_.isFunction(connectFunction)) {
    return connect(connectFunction as Function)
  }

  return connect((store: any) => {
    return _.pick(store, connectFunction as string[])
  })
}

export default Connect
