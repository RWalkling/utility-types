import { AsType } from './simple';
import { FuncOf } from './functions';

export type TupleOf<T> = [T] | T[];
export type AnyTuple = TupleOf<unknown>;
export type AsTuple<T> = AsType<T, AnyTuple>;

export type Unshift<Tuple extends AnyTuple, Head = never> = Parameters<((head: Head, ...args: Tuple) => void)>;
export type Shift<Tuple extends AnyTuple> = FuncOf<Tuple> extends ((head: never, ...args: infer R) => unknown) ? R : never;
export type AtLastIndex<Tuple extends AnyTuple> = Tuple[Shift<Tuple>['length']];

export type SameLength<Tuple> = {
    [K in keyof Tuple]: unknown;
};

export type Zip<Tuple extends AnyTuple, OtherTuple extends SameLength<Tuple>> = {
    [Index in keyof Tuple]: [Tuple[Index], OtherTuple[Index]];
};
