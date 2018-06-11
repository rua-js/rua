import Convertor from '../Convertor'

describe('Convertor Tests', () =>
{
  test('Json2FormData', () =>
  {
    // prep
    const json = { a: 1, b: 2, }
    const form = Convertor.Json2FormData(json)
    // has 'a'
    expect(
      form.get('a')
    ).toBe('1')

    // has 'b'
    expect(
      form.get('b')
    ).toBe('2')
  })
})