import { AsType, AtKey, TupleOf, UnionToIntersection } from './simple';

type IsNever<T> = [T] extends [never] ? unknown : never;

type MutuallyExclusiveGroup<GroupTypeVariable,
    Keys extends PropertyKey,
    MutuallyExclusiveKeys extends PropertyKey,
    > = { [K in MutuallyExclusiveKeys]?: GroupTypeVariable & IsNever<Exclude<Keys & MutuallyExclusiveKeys, K>>; };

type MutuallyExclusive<Keys extends PropertyKey,
    Free,
    Groups extends TupleOf<[PropertyKey, unknown]>,
    > = Partial<Record<Keys, unknown>> & Free & UnionToIntersection<{
    [Index in keyof Groups]: MutuallyExclusiveGroup<AtKey<Groups[Index], 1>,
        Keys,
        AsType<AtKey<Groups[Index], 0>, PropertyKey>>
}[number]>;

export default MutuallyExclusive;
