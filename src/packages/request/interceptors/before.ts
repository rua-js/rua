import { RequestConfig } from '../Type'

export default function (config: RequestConfig)
{
  const { options } = config
  const { before } = options

  // apply before
  if (typeof options.before === 'function')
  {
    // call before()
    before(options)

    // clean up to avoid unwanted result
    delete config.options.before
  }
}
