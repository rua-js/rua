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
    this.driver = I18n
    this.driver.fallbacks = true
    this.booted = true
  }

  /**
   * Sets current locale
   *
   * @param {string} locale
   */
  public setLocale(locale: string): void
  {
    this.driver.locale = locale
  }

  /**
   * Sets default locale
   *
   * @param {string} locale
   */
  setDefaultLocale(locale: string): void
  {
    this.driver.defaultLocale = locale
  }

  /**
   * Loads translations
   *
   * @param {AnyObject} translations
   */
  public load(translations: AnyObject): void
  {
    this.driver.translations = translations
  }

  /**
   * Translates given words
   *
   * @param {string} translation
   * @returns {string}
   */
  public translate(translation: string): string
  {
    return this.driver.t(translation)
  }
}
