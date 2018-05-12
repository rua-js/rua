import {convertor} from '../'
import Convertor from '../Convertor'

describe('Convertor Index Tests', () => {
  test('export correctly', () => {
    // case: equal
    expect(
      convertor === Convertor
    ).toBeTruthy()
  })
})