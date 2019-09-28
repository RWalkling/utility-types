export type Primitives = string | number | symbol | boolean | object | undefined | bigint;
export type Basic = Primitives | null | void | ((...args: never[]) => void);
export type ValuesOf<T> = T[keyof T];
export type Guard<T> = (obj: any) => obj is T;
export type AtKey<T, Key, Default = never> = Key extends keyof T ? T[Key] : Default;
export type AsType<T, S, Default = never> = T extends S ? T : Default;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;  // Credit to jcalz: https://stackoverflow.com/a/50375286/
