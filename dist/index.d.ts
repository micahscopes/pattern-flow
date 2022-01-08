declare module 'pattern-flow/cyclical' {
  import { Stream } from '@most/types';
  export const beginning: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<any>>;
  export const ending: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<any>>;
  /**
  * Create a cyclic clip stream from a given source stream, centered around the time given by `phase`.
  * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
  * @param {Time} clipStart -
  * @param {Time} clipEnd -
  * @param {Time} phase -
  * @param {Stream<T>} source$ -
  * @return {Stream<T>} Brief description of the returning value here.
  */
  export const clipPeriodic: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<any>>;
  export const cycle: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<Stream<any>>>;
  export const endlessCycle: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<any>>;
  export const pickup: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<Stream<any>>>;
  const _default: import("@typed/curry").Curry2<number, Stream<any>, Stream<Stream<any>>>;
  export default _default;
  //# sourceMappingURL=cyclical.d.ts.map
}
declare module 'pattern-flow/cyclical.d.ts' {
  {"version":3,"file":"cyclical.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/cyclical.ts"],"names":[],"mappings":"AACA,OAAO,EAAQ,MAAM,EAAE,MAAM,aAAa,CAAA;AAS1C,eAAO,MAAM,SAAS,iFAGpB,CAAA;AAEF,eAAO,MAAM,MAAM,iFAGjB,CAAA;AAEF;;;;;;;;EAQE;AAEF,eAAO,MAAM,YAAY,iFAKvB,CAAA;AAEF,eAAO,MAAM,KAAK,yFAMhB,CAAA;AAEF,eAAO,MAAM,YAAY,iFAAwF,CAAA;AAEjH,eAAO,MAAM,MAAM,yFACqB,CAAA;;AAExC,wBAMC"}
}
declare module 'pattern-flow/grid' {
  import { Time } from '@most/types';
  import { Stream } from '@most/types';
  /**
   * Create a stream of events that occur at a regular period on a grid
   * @param {Time} period periodicity of events
   * @returns {Stream} new stream of periodic events, the event value is undefined
   */
  export const grid: (period: Time, phase?: Time) => Stream<void>;
  /**
   * Produce a stream that emits a given value simultaneously with the next event in a given alignment stream.
   * @param {Stream} alignment$ the stream to align to
   * @param {any} value the value to emit
   * @returns {Stream} a stream that emits the given value upon the next event in the alignment stream
   */
  export const aligned: import("@typed/curry").Curry2<Stream<any>, any, Stream<unknown>>;
  export const alignAll: import("@typed/curry").Curry2<Stream<any>, Stream<any>, Stream<Stream<unknown>>>;
  export const quantize: import("@typed/curry").Curry2<number, Stream<any>, Stream<Stream<unknown>>>;
  //# sourceMappingURL=grid.d.ts.map
}
declare module 'pattern-flow/grid.d.ts' {
  {"version":3,"file":"grid.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/grid.ts"],"names":[],"mappings":"AAEA,OAAO,EAAE,IAAI,EAAE,MAAM,aAAa,CAAA;AAClC,OAAO,EAAE,MAAM,EAA+B,MAAM,aAAa,CAAA;AA2BjE;;;;GAIG;AACH,eAAO,MAAM,IAAI,WAAY,IAAI,UAAS,IAAI,KAAO,OAAO,IAAI,CAA4B,CAAA;AAE5F;;;;;GAKG;AACH,eAAO,MAAM,OAAO,kEAA6F,CAAA;AAEjH,eAAO,MAAM,QAAQ,kFAEpB,CAAA;AAmBD,eAAO,MAAM,QAAQ,6EAGnB,CAAA"}
}
declare module 'pattern-flow/index' {
  export * from 'pattern-flow/grid';
  export * from 'pattern-flow/cyclical';
  export * from 'pattern-flow/spout';
  export * from 'pattern-flow/util';
  //# sourceMappingURL=index.d.ts.map
}
declare module 'pattern-flow/index.d.ts' {
  {"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/index.ts"],"names":[],"mappings":"AAAA,cAAc,QAAQ,CAAA;AACtB,cAAc,YAAY,CAAA;AAC1B,cAAc,SAAS,CAAA;AACvB,cAAc,QAAQ,CAAA"}
}
declare module 'pattern-flow/spout' {
  import { Stream } from '@most/types';
  interface SpigotSpec {
      on$: Stream<Boolean>;
      off$?: Stream<Boolean>;
      fx?: ($: Stream<any>) => any;
  }
  export const sampler: import("@typed/curry").Curry2<Stream<any>, Stream<any>, Stream<any>>;
  export const regulate: import("@typed/curry").Curry2<Stream<any>, Stream<any>, Stream<any>>;
  export const muffle: import("@typed/curry").Curry2<Stream<Boolean>, Stream<any>, Stream<any>>;
  export const release: import("@typed/curry").Curry2<Stream<Boolean>, Stream<any>, Stream<any>>;
  export const wrappedFlowLatch: import("@typed/curry").Curry3<($: Stream<any>) => Stream<any>, Stream<any>, Stream<Boolean>, Stream<Stream<any>>>;
  export const flowLatch: import("@typed/curry").Curry2<Stream<any>, Stream<Boolean>, Stream<Stream<any>>>;
  export const latchFlow: import("@typed/curry").Curry2<Stream<Boolean>, Stream<any>, Stream<Stream<any>>>;
  export const latchWrappedFlow: import("@typed/curry").Curry3<Stream<Boolean>, (x: Stream<any>) => Stream<any>, Stream<any>, Stream<Stream<any>>>;
  export const spout: import("@typed/curry").Curry2<Stream<any>, Stream<Boolean>, Stream<Stream<any>>>;
  export const stutter: import("@typed/curry").Curry3<number, number, Stream<any>, Stream<any>>;
  export const asLatch: ($: Stream<any>) => Stream<any>;
  export const spigot: import("@typed/curry").Curry2<SpigotSpec, Stream<any>, Stream<any>>;
  export type routeKey = string;
  export const router: import("@typed/curry").Curry2<{
      [key: string]: Stream<any>;
  }, Stream<Set<string>>, Stream<never>>;
  export {};
  //# sourceMappingURL=spout.d.ts.map
}
declare module 'pattern-flow/spout.d.ts' {
  {"version":3,"file":"spout.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/spout.ts"],"names":[],"mappings":"AACA,OAAO,EAAE,MAAM,EAAE,MAAM,aAAa,CAAA;AAuBpC,UAAU,UAAU;IAClB,GAAG,EAAE,MAAM,CAAC,OAAO,CAAC,CAAA;IACpB,IAAI,CAAC,EAAE,MAAM,CAAC,OAAO,CAAC,CAAA;IACtB,EAAE,CAAC,EAAE,CAAC,CAAC,EAAE,MAAM,CAAC,GAAG,CAAC,KAAK,GAAG,CAAA;CAC7B;AAGD,eAAO,MAAM,OAAO,sEAA8E,CAAA;AAClG,eAAO,MAAM,QAAQ,sEAAU,CAAA;AAK/B,eAAO,MAAM,MAAM,0EAKjB,CAAA;AAGF,eAAO,MAAM,OAAO,0EAKlB,CAAA;AAEF,eAAO,MAAM,gBAAgB,oCAChB,OAAO,GAAG,CAAC,KAAK,OAAO,GAAG,CAAC,oDAIvC,CAAA;AAED,eAAO,MAAM,SAAS,kFAErB,CAAA;AAED,eAAO,MAAM,SAAS,kFAAmF,CAAA;AAEzG,eAAO,MAAM,gBAAgB,qDACS,OAAO,GAAG,CAAC,KAAK,OAAO,GAAG,CAAC,mCAEhE,CAAA;AAED,eAAO,MAAM,KAAK,kFAAY,CAAA;AAE9B,eAAO,MAAM,OAAO,yEAEnB,CAAA;AAED,eAAO,MAAM,OAAO,MAAO,OAAO,GAAG,CAAC,gBAAqB,CAAA;AAE3D,eAAO,MAAM,MAAM,qEAMjB,CAAA;AAEF,oBAAY,QAAQ,GAAG,MAAM,CAAA;AAE7B,eAAO,MAAM,MAAM;;sCAyBjB,CAAA"}
}
declare module 'pattern-flow/util' {
  import { Stream } from '@most/types';
  export const tapConsole: (msg: any) => (s: Stream<unknown>) => Stream<unknown>;
  export const isOn: ($: Stream<any>) => Stream<any>;
  export const isOff: ($: Stream<any>) => Stream<any>;
  export const invert: ($: Stream<any>) => Stream<boolean>;
  //# sourceMappingURL=util.d.ts.map
}
declare module 'pattern-flow/util.d.ts' {
  {"version":3,"file":"util.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/util.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,MAAM,EAAE,MAAM,aAAa,CAAA;AAGpC,eAAO,MAAM,UAAU,QAAS,GAAG,4CAAoC,CAAC;AAExE,eAAO,MAAM,IAAI,MAAO,OAAO,GAAG,CAAC,gBAA6B,CAAA;AAChE,eAAO,MAAM,KAAK,MAAO,OAAO,GAAG,CAAC,gBAA8B,CAAA;AAClE,eAAO,MAAM,MAAM,MAAO,OAAO,GAAG,CAAC,oBAAoB,CAAA"}
}
declare module 'pattern-flow' {
  import main = require('pattern-flow/index');
  export = main;
}