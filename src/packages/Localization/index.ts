import Localization from './Localization'

import { packager } from 'rua-core/lib'

const locale: Localization = <Localization>packager.registerIfNotRegistered('rua-localization',  new Localization())

const __: Function = locale.translate

const translate: Function = locale.translate

export {
  locale,
  __,
  translate,
}