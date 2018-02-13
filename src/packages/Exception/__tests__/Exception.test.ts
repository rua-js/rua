import Exception from '../Exception'

describe('Exception', () => {
  test('can initialize correctly', () => {
    const e = new Exception('init')
    // case: Exception
    expect(
      e instanceof Exception
    ).toBeTruthy()
    // case: Error
    expect(
      e instanceof Error
    ).toBeTruthy()
  })
  test('has correct property', () => {
    const e = new Exception('property')
    // case: name
    expect(
      e.name
    ).toBe('Exception')
    // case: message
    expect(
      e.message
    ).toBe('property')
    // case: stack
    expect(
      e.stack
    ).toBeTruthy()
  })
})