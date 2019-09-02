import { AnyFunc, FuncOf } from '../functions';
import { AnyTuple } from '../tuples';

export type MaybePromise<T> = T | Promise<T>;
export type UnpackedPromise<T> = T extends Promise<infer R> ? R : T;

export type Async<Args extends AnyTuple, R> = FuncOf<Args, Promise<R>>;
export type MaybeAsync<Args extends AnyTuple, R> = FuncOf<Args, MaybePromise<R>>;

export type MatchPromise<T, MaybePromise> = MaybePromise extends Promise<unknown> ? Promise<T> : T;
export type MatchAsync<T, MaybeAsync extends AnyFunc> = MatchPromise<T, ReturnType<MaybeAsync>>;

export type FilterPromise<T> = Extract<T, Promise<unknown>>;
export type CoverPromises<T> = [FilterPromise<T>] extends [never] ? T : Promise<UnpackedPromise<T>>;
