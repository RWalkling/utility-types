const recursionKey = Symbol();

export interface Recurse<T> {
    readonly [recursionKey]: T;
}

type Recursive<T> = T | Recurse<Recursive<T>>;

export type Flatten<T> = T extends Recursive<infer R> ? R : never;
