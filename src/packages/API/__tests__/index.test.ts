import {
  API,
} from '../'

describe('API Index Tests', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      API instanceof Function
    ).toBeTruthy()
  })
})
