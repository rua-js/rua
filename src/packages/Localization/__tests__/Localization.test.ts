import Localization from '../Localization'

describe('Localization Tests', () => {
  test('can create instance', () => {
    expect(
      new Localization() instanceof Localization
    )
  })

  test('translation', () => {
    // prep
    const locale = new Localization()
    const translations = {
      'zh-CN': {
        hi: 'test',
      },
    }
    locale.load(translations)

    // case: translate
    locale.setLocale('zh-CN')
    expect(
      locale.translate('hi')
    ).toBe('test')
  })

  test('.setDefaultLocale', () => {
    // prep
    const locale = new Localization()
    const translations = {
      'zh-CN': {
        hi: 'test',
      },
    }
    locale.load(translations)

    // case: translate
    locale.setDefaultLocale('zh-CN')
    expect(
      locale.translate('hi')
    ).toBe('test')
  })
})