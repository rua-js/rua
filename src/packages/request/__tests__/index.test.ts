import {
  request,
} from '../index'

describe('request Index Tests', () => {
  test('export correctly', () => {
    // case: request
    expect(
      request instanceof Function
    ).toBeTruthy()
  })
})