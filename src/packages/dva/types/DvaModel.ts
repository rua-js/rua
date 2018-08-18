import { ObjectOf } from '../../core/type/data'

export default interface DvaModel
{
  state: ObjectOf<any>

  reducers: ObjectOf<Function>

  effects: ObjectOf<Function>

  subscriptions: ObjectOf<Function>
}
