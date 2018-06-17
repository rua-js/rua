import {
  API,
} from '../'

describe('api Index Tests', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      API instanceof Function
    ).toBeTruthy()
  })
})
