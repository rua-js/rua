import { AnyObject } from 'rua-core/lib/Types'

interface LocalizationInterface {
  /**
   * Sets current locale
   *
   * @param {string} locale
   */
  set(locale: string): void

  /**
   * Loads translations
   *
   * @param {AnyObject} translations
   */
  load(translations: AnyObject): void
}

export default LocalizationInterface
