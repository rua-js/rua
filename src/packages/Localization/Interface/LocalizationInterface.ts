import { AnyObject } from 'rua-core/lib/Types'

interface LocalizationInterface
{
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

  /**
   * Translates given words
   *
   * @param {string} translation
   * @returns {string}
   */
  translate(translation: string): string
}

export default LocalizationInterface
