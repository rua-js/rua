// Third-party Dependency
import { AsyncStorage } from 'react-native'
import * as _ from 'lodash'
// Self Dependency
// rua Core Dependency
import { AnyData, AnyObject } from '../core/type/data'

export default class StorageEngine
{
  // @ts-ignore
  public static get length(): Promise<number>
  {
    return this.keys().then(keys => keys.length)
  }

  public static async set(key: string | string[], value: AnyData | AnyData[]): Promise<void>
  {
    if (Array.isArray(key))
    {
      const values: string[] = <string[]>(<AnyObject[]>value)
        .map((item: AnyData) => JSON.stringify(item))
      // @ts-ignore
      const pair: [string, string][] = _.zip(
        <string[]>key,
        <string[]>values,
      )
      await AsyncStorage.multiSet(pair)

      return
    }

    await AsyncStorage.setItem(<string>key, JSON.stringify(value))

    return
  }

  public static async get(key: string | string[], defaultValue?: any): Promise<AnyData>
  {
    if (Array.isArray(key))
    {
      const data: string[][] = await AsyncStorage.multiGet(<string[]>key)
      data.map((item: string[]) =>
      {
        return [item[0], JSON.parse(item[1])]
      })

      return data.length ? _.fromPairs(data) : defaultValue
    }

    const value = await AsyncStorage.getItem(<string>key)

    // @ts-ignore
    return JSON.parse(value) || defaultValue
  }

  public static async remove(key: string | string[]): Promise<void>
  {
    if (Array.isArray(key))
    {
      return await AsyncStorage.multiRemove(<string[]>key)
    }

    return await AsyncStorage.removeItem(<string>key)
  }

  public static async clear(): Promise<void>
  {
    return await AsyncStorage.clear()
  }

  public static async keys(): Promise<string[]>
  {
    return await AsyncStorage.getAllKeys()
  }

  public static async values(): Promise<AnyData[]>
  {
    const keys = await this.keys()

    return this.get(keys)
  }

  public static async all(): Promise<AnyObject>
  {
    const data = {}
    const keys = await this.keys()
    const rawAllData = await AsyncStorage.multiGet(keys)
    // Reformat
    for (const rawItem in rawAllData)
    {
      // @ts-ignore: index on object
      data[rawItem[0]] = rawItem[1]
    }

    return data
  }
}
