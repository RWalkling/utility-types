import { AnyTuple, TupleOf } from './tuples';

export type AnyParams = TupleOf<never>;
export type AnyReturn = void;
export type FuncOf<Args extends AnyTuple = AnyParams, Return = AnyReturn> = (...args: Args) => Return;
export type AnyFunc = FuncOf<AnyParams, AnyReturn>;
