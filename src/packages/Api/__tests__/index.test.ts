import {
  Api,
  api,
} from '../index'

describe('Api Index Tests', () => {
  test('export correctly', () => {
    // case: instance
    expect(
      api instanceof Function
    ).toBeTruthy()
  })
})
