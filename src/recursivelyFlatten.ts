const recursionKey = Symbol();

export interface Recurse<T> {
    [recursionKey]: T;
}

type Recursive<T> = T | Recurse<Recursive<T>>;

export type Flatten<T> = T extends Recursive<infer R> ? R : never;
