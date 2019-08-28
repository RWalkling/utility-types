// import MutuallyExclusive from '../src/MutuallyExclusive';
import { AsType, AtKey, Primitives, RecursiveLiteral, TupleOf, UnionToIntersection } from '../src';

type IsNever<T> = [T] extends [never] ? unknown : never;

type MutuallyExclusiveGroup<GroupTypeVariable,
    Keys extends PropertyKey,
    MutuallyExclusiveKeys extends PropertyKey,
    > = { [K in MutuallyExclusiveKeys]?: GroupTypeVariable & IsNever<Exclude<Keys & MutuallyExclusiveKeys, K>>; };

type MutuallyExclusive<Keys extends PropertyKey,
    Free,
    Groups extends TupleOf<[PropertyKey, unknown]>,
    > = Record<Keys, unknown> & Free & UnionToIntersection<{
    [Index in keyof Groups]: MutuallyExclusiveGroup<AtKey<Groups[Index], 1>,
        Keys,
        AsType<AtKey<Groups[Index], 0>, PropertyKey>>
}[number]>;

declare function sampleFunction<
    Keys extends 'a' | 'b' | 'c' | 'd' | 'e' | 'f',
    Container extends TupleOf<Primitives>,

    T1 extends RecursiveLiteral<Container> = never,
    T2 extends RecursiveLiteral<Container> = never,
    >(value: MutuallyExclusive<
    Keys,
    {
        a: 'a str';
    }, [
        ['c' | 'd', T1],
        ['e' | 'f', T2],
    ]
    >): typeof value;

const sampleFunctionResult = sampleFunction({
    a: 'a str',
    c: {
        xyz: 'xyz',
    },
    f: (() => 55) as () => 55,
});

type ActualType = typeof sampleFunctionResult;

type ExpectActualType<T extends ActualType> = T;
type ExpectExpectedType<T extends {
    a: 'a str';
    c?: {
        xyz: 'xyz';
    };
    f?: () => 55;
}> = T;


type ShouldBeSubtypeOf = ExpectExpectedType<ActualType>;
type ShouldBeSupertypeOf = ExpectActualType<{
    a: 'a str';
    c: {
        xyz: 'xyz';
    };
    f: () => 55;
}>;
