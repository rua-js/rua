import * as faker from 'faker'
import { ApiEntity } from '../engine'

describe('ApiEntity tests', () =>
{
  test('parse string', () =>
  {
    const t1 = faker.address.city()
    const e1 = {
      url: t1,
    }

    // Regular
    expect(new ApiEntity(t1).toObject()).toEqual(e1)
  })

  test('parse standard entity', () =>
  {
    const t1 = {
      url: faker.address.country(),
      a: faker.address.city(),
    }

    // No Reference
    expect(new ApiEntity(t1).toObject()).not.toBe(t1)

    // Regular
    expect(new ApiEntity(t1).toObject()).toEqual(t1)
  })
})
