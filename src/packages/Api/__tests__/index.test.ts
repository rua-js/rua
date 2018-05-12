import {
  api,
} from '../'

describe('Api Index Tests', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      api instanceof Function
    ).toBeTruthy()
  })
})
