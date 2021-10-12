
// import { curry } from "@typed/curry";
// import { Stream } from "@most/types"
// import { empty, map, take, until } from '@most/core';
// import { pipe } from "fp-ts/lib/function";
// import { filter } from "@most/core/dist/combinator/filter";

// interface ConditionalFlow {
//   check: (x: any) => Boolean,
//   on$: Stream<any>,
//   off$: Stream<any>
// }

// interface RouterSetup {
//   : Stream<Boolean>,
//   off$: Stream<Boolean>,
//   trail: ($: Stream<any>) => any
// }

// export const isOn = ($: Stream<any>) => filter((l: any) => l, $);
// export const isOff = ($: Stream<any>) => filter((l: any) => !l, $);

// export const router = curry(({ on$, off$, trail }: RouterSetup, latch$: Stream<any>) => {
//   on$ = on$ || empty();
//   off$ = off$ || empty();

//   return map((value) => {
//     return value
//       ? pipe(on$, until(pipe(latch$, isOff, take(1))), trail)
//       : pipe(off$, until(pipe(latch$, isOn, take(1))), trail)
//   }, latch$);
// });
