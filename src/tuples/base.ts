import { AsType } from '../simple';

export type TupleOf<T> = [T] | T[];
export type AnyTuple = TupleOf<unknown>;
export type AnyContraTuple = TupleOf<never>;
export type AsTuple<T> = AsType<T, AnyTuple>;
