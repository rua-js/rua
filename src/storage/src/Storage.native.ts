// Third-party Dependency
import { AsyncStorage } from 'react-native'
import * as _ from 'lodash'
// rua Core Dependency
import { AnyObject } from '../../rua/type/data'
import { StorageInterface } from './interface'

export default class StorageEngine implements StorageInterface
{
  public get length(): Promise<number>
  {
    return this.keys().then(keys => keys.length)
  }

  public async set(key: string | string[], value: any | any[]): Promise<void>
  {
    if (Array.isArray(key))
    {
      const values: string[] = <string[]>(<AnyObject[]>value)
        .map((item: any) => JSON.stringify(item))
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

  public async get(key: string | string[], defaultValue?: any): Promise<any>
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

  public async remove(key: string | string[]): Promise<void>
  {
    if (Array.isArray(key))
    {
      return await AsyncStorage.multiRemove(<string[]>key)
    }

    return await AsyncStorage.removeItem(<string>key)
  }

  public async clear(): Promise<void>
  {
    return await AsyncStorage.clear()
  }

  public async keys(): Promise<string[]>
  {
    return await AsyncStorage.getAllKeys()
  }

  public async values(): Promise<any[]>
  {
    const keys = await this.keys()

    return this.get(keys)
  }

  public async all(): Promise<AnyObject>
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
