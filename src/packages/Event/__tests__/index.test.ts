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
})
