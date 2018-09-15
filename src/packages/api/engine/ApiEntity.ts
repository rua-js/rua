import { ApiEntityObject } from '../type'
import { ApiEntityInterface } from '../interface'

export default class ApiEntity implements ApiEntityInterface
{
  protected entity: ApiEntityObject

  constructor(entity: ApiEntityObject | string)
  {
    if ('string' === typeof entity)
    {
      this.entity = {
        url: entity,
      }

      return this
    }

    this.entity = { ...entity }
  }

  public toObject(): ApiEntityObject
  {
    return this.entity
  }
}
