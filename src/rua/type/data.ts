export type AnyData = any

export interface AnyObject
{
  [key: string]: any
}

export type AnyBoolean = boolean
export type AnyArray = any[]

export type Nill = null | undefined
export type Nilable<T> = null | undefined | T

export type Null = null
export type Nullable<T> = null | T

export type Undefined = undefined
export type Undefinable<T> = undefined | T

export type ArrayOf<T> = T[]

export interface ObjectOf<T>
{
  [key: string]: T
}
