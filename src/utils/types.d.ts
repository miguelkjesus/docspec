export type AnyKey = string | symbol | number

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyAbstractClass = abstract new (...args: any[]) => any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyClass = new (...args: any[]) => any
