import Localization from './Localization'

import { packager } from 'rua-core/lib'

const locale: Localization = packager.registerIfNotRegistered('rua-localization',  new Localization())

const __: Function = locale.translate

const t: Function = locale.translate

export {
  locale,
  __,
  t,
}