import { FuncOf } from '../functions';
import { AnyTuple } from './base';

export type Unshift<Tuple extends AnyTuple,
    Head = never> = ((head: Head, ...args: Tuple) => void) extends ((...args: infer R) => void) ? Readonly<R> : never;
export type Shift<Tuple extends AnyTuple> =
    FuncOf<Tuple> extends ((head: never, ...args: infer R) => unknown) ? Readonly<R> : never;
export type Last<Tuple extends AnyTuple> = Tuple[Shift<Tuple>['length']];

export type SameLength<Tuple> = {
    readonly [K in keyof Tuple]: unknown;
};

export type Zip<Tuple extends AnyTuple, OtherTuple extends SameLength<Tuple>> = {
    readonly [Index in keyof Tuple]: [Tuple[Index], OtherTuple[Index]];
};
