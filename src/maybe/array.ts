import { AnyTuple, TupleOf } from '../readonlyTuples';

export type MaybeArray<T> = T | TupleOf<T>;

export type MatchArray<Arr extends AnyTuple, T> = T extends (infer R)[] ? Arr : Arr[number];

export type TypeUnion<T> = T extends (infer R)[] ? R : T;
