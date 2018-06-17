import { convertor } from '../'
import Convertor from '../Convertor'

describe('convertor Index Tests', () =>
{
  test('export correctly', () =>
  {
    // case: equal
    expect(
      convertor === Convertor
    ).toBeTruthy()
  })
})