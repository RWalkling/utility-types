import { AnyTuple } from './base';
import { Flatten, Recurse } from '../recursivelyFlatten';
import { Shift, Unshift } from './tuples';

type Reverse_<Tuple extends AnyTuple, MirrorTuple extends AnyTuple> = Tuple extends readonly []
    ? MirrorTuple
    : Recurse<Reverse_<Shift<Tuple>, Unshift<MirrorTuple, Tuple[0]>>>;
export type Reverse<Tuple extends AnyTuple> = Flatten<Reverse_<Tuple, readonly []>>;

type Concat_<TupleA extends AnyTuple, TupleB extends AnyTuple, CounterTuple extends AnyTuple> = CounterTuple extends readonly []
    ? Unshift<TupleB, TupleA[0]>
    : Recurse<Concat_<TupleA, Unshift<TupleB, TupleA[CounterTuple['length']]>, Shift<CounterTuple>>>;
export type Concat<TupleA extends AnyTuple, TupleB extends AnyTuple> = Flatten<Concat_<TupleA, TupleB, Shift<TupleA>>>;

const rangeSymbol = Symbol();
type RangeSymbol = typeof rangeSymbol;
type OfLength_<N extends number, Tuple extends AnyTuple, FillType> =
    Tuple['length'] extends N
        ? Tuple
        : Recurse<OfLength_<N, Unshift<Tuple, FillType extends RangeSymbol ? Tuple['length'] : FillType>, FillType>>;
export type OfLength<N extends number, FillType = RangeSymbol> = Flatten<OfLength_<N, readonly [], FillType>>;

type Range_<Start extends number, End extends number, CounterTuple extends AnyTuple, Result extends AnyTuple, Store extends boolean> = Store extends false
    ? CounterTuple['length'] extends End
        ? Recurse<Range_<Start, End, Shift<CounterTuple>, Result, true>>
        : Recurse<Range_<Start, End, Unshift<CounterTuple>, Result, false>>
    : CounterTuple['length'] extends Start
        ? Unshift<Result, CounterTuple['length']>
        : Recurse<Range_<Start, End, Shift<CounterTuple>, Unshift<Result, CounterTuple['length']>, Store>>
    ;

export type Range<Start extends number = 0, End extends number = never> = [End] extends [never]
    ? Flatten<Range_<0, Start, readonly [], readonly [], false>>
    : Flatten<Range_<Start, End, readonly [], readonly [], false>>;
