export default interface StorageLike
{
  set(key: string | string[], value: any | any[]): Promise<void>;

  get(key: string | string[], defaultValue?: any | any[]): Promise<any>;

  remove(key: string | string[]): Promise<void>;
}
