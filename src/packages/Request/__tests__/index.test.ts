import {
  request,
} from '../index'

describe('Request Index Tests', () => {
  test('export correctly', () => {
    // case: request
    expect(
      request instanceof Function
    ).toBeTruthy()
  })
})