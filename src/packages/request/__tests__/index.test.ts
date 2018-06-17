import {
  Request,
} from '../index'

describe('Request Index Tests', () => {
  test('export correctly', () => {
    // case: Request
    expect(
      Request instanceof Function
    ).toBeTruthy()
  })
})