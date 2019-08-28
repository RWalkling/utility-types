import { Primitives, TupleOf } from './simple';

interface RecursiveArray<T> {
    [K: number]: T | RecursiveArray<T> | RecursiveObject<T>;
}

interface RecursiveObject<T> {
    [K: string]: T | RecursiveArray<T> | RecursiveObject<T>;
}

export type Recursive<T> = T | RecursiveArray<T> | RecursiveObject<T>;

export type RecursiveLiteral<Container extends TupleOf<Primitives>> = Recursive<Container[number] | TupleOf<Container[number]>>;
