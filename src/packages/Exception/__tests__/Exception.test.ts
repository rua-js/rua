import Exception from '../Exception'

describe('Exception', () => {
  test('initialization', () => {
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

  test('property', () => {
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

  test('inherit', () => {
    class InheritorException extends Exception {}
    const e = new InheritorException('property')
    // case: name
    expect(
      e.name
    ).toBe('InheritorException')
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