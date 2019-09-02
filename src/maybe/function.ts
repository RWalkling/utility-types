export type MaybeFunction<T> = T | (() => T);

export type MatchFunction<T, MaybeFunction> = MaybeFunction extends (() => unknown) ? (() => T) : T;
