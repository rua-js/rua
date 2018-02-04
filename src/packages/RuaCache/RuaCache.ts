import { storage } from 'rua-storage/lib'
import RuaStorage from 'rua-storage/lib/RuaStorage'

import { RuaCacheInterface } from './Interface'
import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'
import { AnyData, AnyObject } from 'rua-core/lib/Types'
import * as _ from 'lodash'

class RuaCache extends AbstractRuaPackage implements RuaCacheInterface {

  protected prefix: string = 'RuaCache-'

  /**
   * RuaStorage instance
   *
   * @type {RuaStorage}
   */
  protected storage: RuaStorage = storage

  /**
   * Cached data count
   *
   * @type {number}
   */
  protected count: number = -1

  /**
   * Cached data keys
   *
   * @type {string[]}
   */
  protected list: string[] = []

  public get(key: string, defaultValue: any): AnyData {
    const realKeyName = this.getItemKey(key)
    // defaultValue will be returned if no data with the specific key
    if (!this.list.includes(realKeyName)) {
      return defaultValue
    }
    // retrieve data from cache
    return this.store[realKeyName]
  }

  public set(key: string, value: string, time: number): void {
  }

  public remove(key: string): void {
    const realKeyName = this.getItemKey(key)
    // Cache removal
    _.unset(this.store, realKeyName)
    _.pull(this.list, realKeyName)

    // Sync list
    this.storage.set(
      this.getListKey(),
      this.list,
    )
    // Sync item
    this.storage.remove(realKeyName)
  }

  public clear(): void {
    this.count = 0
    this.list = []
    // remove all data from storage
    this.storage.remove(this.list)
    // remove list from storage
    this.storage.remove(this.getListKey())
  }

  public length(): number {
    return this.count
  }

  public keys(): string[] {
    return this.list
  }

  public all(): any {
    return this.store
  }

  public async restore(): Promise<void> {
    // Get list key
    const listKey: string = <string>this.getListKey()
    // Get list data
    const list: string = <string>await storage.get(listKey, [])
    // Parse list data
    this.list = <string[]>JSON.parse(list)
    // Load all saved cache data to store
    this.store = <AnyObject>await storage.get(this.list)
    // Calculate count
    this.count = this.list.length
  }

  protected getListKey(): string {
    return `${this.prefix}list`
  }

  protected getItemKey(key: string): string {
    return `${this.prefix}${key}`
  }
}

export default RuaCache
