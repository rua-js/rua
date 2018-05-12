// defaults
import { colors } from '../Defaults'

// module
import { resource } from '../'

describe('Resource Tests',() => {
  test('default colors', () => {
    expect(
      resource.color
    ).toEqual(colors)
  })

  test('added colors', () => {
    resource.config({
      color: {
        red: '1314'
      }
    })

    expect(
      resource.color.red
    ).toBe('1314')
  })

})