import { Primitives } from './simple';
import { TupleOf } from './tuples';

interface RecursiveArray<T> {
    [K: number]: Recursive<T>;
}

interface RecursiveObject<T> {
    [K: string]: Recursive<T>;
}

export type Recursive<T> = T | RecursiveArray<T> | RecursiveObject<T>;

export type RecursiveLiteral<Container extends TupleOf<Primitives>> = Recursive<Container[number] | TupleOf<Container[number]>>;
