export type Key = string | symbol | number

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Callback = (...args: any[]) => any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractClass = abstract new (...args: any[]) => any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Class = new (...args: any[]) => any

export type InternalKeys<T> = {
  [K in keyof T]: K extends `__${string}` ? K : never
}[keyof T]

export type StripInternals<T> = Omit<T, InternalKeys<T>>

export type MethodKeysOf<T> = {
  [K in keyof T]: T[K] extends Callback ? K : never
}[keyof T]
