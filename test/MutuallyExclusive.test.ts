import MutuallyExclusive from '../src/MutuallyExclusive';
import { Primitives, RecursiveLiteral, TupleOf } from '../src';

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
