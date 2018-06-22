export type AnyData = any
export interface AnyObject { [key: string]: any }
export type AnyBoolean = boolean
export type AnyArray = any[]

export type Nilable = null | undefined
export type NilableArray = any[] | undefined | null
export type NilableBoolean = Nilable | AnyBoolean
export type NilableObject = Nilable | AnyObject
export type Nullable = null
export type NullableArray = any[] | null
export type NullableBoolean = boolean | Nullable
export type NullableObject = AnyObject | Nullable
export type Undefinable = undefined
export type UndefinableBoolean = boolean | Undefinable
export type UndefinableObject = AnyObject | Undefinable

export type FunctionObject = { [key: string]: Function }

export type FunctionArray = Function[]

export interface ObjectOf<T>
{
  [key: string]: T
}
