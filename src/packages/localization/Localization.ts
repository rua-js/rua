import { LocalizationInterface } from './interface'
import { AnyObject } from 'rua-core/lib/Types'
import I18n from './third-party/i18n'

class Localization implements LocalizationInterface
{

  /**
   * @constructor
   */
  public constructor()
  {
    I18n.fallbacks = true
  }

  /**
   * Sets current locale
   *
   * @param {string} locale
   */
  public setLocale(locale: string): void
  {
    I18n.locale = locale
  }

  /**
   * Sets default locale
   *
   * @param {string} locale
   */
  public setDefaultLocale(locale: string): void
  {
    I18n.defaultLocale = locale
  }

  /**
   * Loads translations
   *
   * @param {AnyObject} translations
   */
  public load(translations: AnyObject): void
  {
    I18n.translations = translations
  }

  /**
   * Translates given words
   *
   * @param {string} translation
   * @returns {string}
   */
  public translate(translation: string): string
  {
    return I18n.t(translation)
  }
}

export default Localization
