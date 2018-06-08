import {
  api,
} from '../'

describe('API Index Tests', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      api instanceof Function
    ).toBeTruthy()
  })
})
