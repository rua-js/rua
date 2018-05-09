import AbstractRuaPackage from 'rua-core/lib/Abstractions/AbstractRuaPackage'
import { LocalizationInterface } from './Interface'
import { AnyObject } from 'rua-core/lib/Types'
import I18n from './ThirdParty/i18n'

class Localization extends AbstractRuaPackage implements LocalizationInterface
{

  /**
   * @constructor
   */
  public constructor()
  {
    super()
    I18n.fallbacks = true
    this.booted = true
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
