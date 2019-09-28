import { AnyTuple, TupleOf } from './base';
import { Flatten, Recurse } from '../recursivelyFlatten';
import { Shift, Unshift } from './tuples';

type Reverse_<Tuple extends AnyTuple, MirrorTuple extends AnyTuple> = Tuple extends []
    ? MirrorTuple
    : Recurse<Reverse_<Shift<Tuple>, Unshift<MirrorTuple, Tuple[0]>>>;
export type Reverse<Tuple extends AnyTuple> = Flatten<Reverse_<Tuple, []>>;

type Concat_<TupleA extends AnyTuple, TupleB extends AnyTuple> = TupleA extends []
    ? TupleB
    : Recurse<Concat_<Shift<TupleA>, Unshift<TupleB, TupleA[0]>>>;
export type Concat<TupleA extends AnyTuple, TupleB extends AnyTuple> = Flatten<Concat_<Reverse<TupleA>, TupleB>>;

type OfLength_<N extends number, Tuple extends TupleOf<never>> =
    Tuple['length'] extends N
        ? Tuple
        : Recurse<OfLength_<N, Unshift<Tuple>>>;
export type OfLength<N extends number> = Flatten<OfLength_<N, []>>;

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
    ? Flatten<Range_<0, Start, [], [], false>>
    : Flatten<Range_<Start, End, [], [], false>>;
