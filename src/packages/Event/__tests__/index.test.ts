import { event } from '../index'
import Event from '../Event'
import { packager } from 'rua-core/lib'

describe('Event Index Tests', () => {
  test('export Event correctly', () => {
    // case: export correct Event
    expect(
      event instanceof Event
    ).toBeTruthy()
  })
  test('register Event correctly', () => {
    // case: has Event
    expect(
      packager.hasPackage('rua-event')
    ).toBeTruthy()
    // case: has correct Event
    expect(
      packager.getPackage('rua-event') instanceof Event
    ).toBeTruthy()
  })
})
