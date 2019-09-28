import { AnyTuple } from './readonlyTuples';
import { Unshift } from './readonlyTuples';

type PropCount_<T, Tuple extends AnyTuple = []> = [keyof T] extends [never] ? Tuple['length'] : {
    [K in keyof T]: PropCount_<Omit<T, K>, Unshift<Tuple>>;
}[keyof T];
export type PropCount<T> = PropCount_<T>;

export type IsSingleKey<Keys extends PropertyKey> = {
    [Key in Keys]: Keys extends Key ? Keys : unknown;
}[Keys];

type IsUnionOfNKeys_<N extends number, Keys extends PropertyKey, CounterTuple extends AnyTuple> = CounterTuple['length'] extends N
    ? [Keys] extends [never]
        ? true
        : false
    : [Keys] extends [never]
        ? false
        : { [Key in Keys]: IsUnionOfNKeys_<N, Exclude<Keys, Key>, Unshift<CounterTuple>> }[Keys];
export type IsUnionOfNKeys<N extends number, Keys extends PropertyKey> = IsUnionOfNKeys_<N, Keys, []>;
