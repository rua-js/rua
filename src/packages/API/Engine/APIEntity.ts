import { APIEntityObject } from '../Type'
import { APIEntityInterface } from '../Interface'

class APIEntity implements APIEntityInterface
{
  protected entity: APIEntityObject

  constructor(entity: APIEntityObject | string)
  {
    if (typeof entity === 'string')
    {
      this.entity = {
        url: entity,
      }

      return this
    }

    this.entity = { ...entity }
  }

  public toObject(): APIEntityObject
  {
    return this.entity
  }
}

export default APIEntity
