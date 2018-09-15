import Localization from '../Localization'

describe('localization Tests', () =>
{
  test('create instance', () =>
  {
    expect(
      new Localization() instanceof Localization,
    )
  })

  test('translate', () =>
  {
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
      locale.translate('hi'),
    ).toBe('test')
  })

  test('default locale', () =>
  {
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
      locale.translate('hi'),
    ).toBe('test')
  })

  test('fallback', () =>
  {
    // prep
    const locale = new Localization()
    const translations = {
      zh: {
        hi: 'test',
      },
    }
    locale.load(translations)

    // case: translate
    locale.setLocale('zh-CN')
    expect(
      locale.translate('hi'),
    ).toBe('test')
  })
})