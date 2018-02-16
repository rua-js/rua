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
    this.store = I18n
    this.booted = true
  }

  /**
   * Sets current locale
   *
   * @param {string} locale
   */
  public setLocale(locale: string): void
  {

  }

  /**
   * Loads translations
   *
   * @param {AnyObject} translations
   */
  public load(translations: AnyObject): void
  {

  }

  /**
   * Translates given words
   *
   * @param {string} translation
   * @returns {string}
   */
  public translate(translation: string): string
  {
    return ''
  }
}
