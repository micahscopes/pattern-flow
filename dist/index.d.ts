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
  const _default: import("@typed/curry").Curry2<number, Stream<any>, Stream<Stream<any>>>;
  export default _default;
  //# sourceMappingURL=cyclical.d.ts.map
}
declare module 'pattern-flow/cyclical.d.ts' {
  {"version":3,"file":"cyclical.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/cyclical.ts"],"names":[],"mappings":"AACA,OAAO,EAAQ,MAAM,EAAE,MAAM,aAAa,CAAA;AAS1C,eAAO,MAAM,SAAS,iFAGpB,CAAA;AAEF,eAAO,MAAM,MAAM,iFAGjB,CAAA;AAEF;;;;;;;;EAQE;AAEF,eAAO,MAAM,YAAY,iFAKvB,CAAA;AAEF,eAAO,MAAM,KAAK,yFAMhB,CAAA;;AAEF,wBAMC"}
}
declare module 'pattern-flow/grid' {
  //# sourceMappingURL=grid.d.ts.map
}
declare module 'pattern-flow/grid.d.ts' {
  {"version":3,"file":"grid.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/grid.ts"],"names":[],"mappings":""}
}
declare module 'pattern-flow/index' {
  export * from 'pattern-flow/cyclical';
  export const logMessage: (msg: string) => void;
  //# sourceMappingURL=index.d.ts.map
}
declare module 'pattern-flow/index.d.ts' {
  {"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/index.ts"],"names":[],"mappings":"AAEA,cAAc,YAAY,CAAA;AAI1B,eAAO,MAAM,UAAU,QAAS,MAAM,SAKrC,CAAA"}
}
declare module 'pattern-flow/quantizer' {
  import { Stream, Timer } from '@most/types';
  const _default: import("@typed/curry").Curry3<Timer, number, Stream<any>, Stream<any>>;
  export default _default;
  //# sourceMappingURL=quantizer.d.ts.map
}
declare module 'pattern-flow/quantizer.d.ts' {
  {"version":3,"file":"quantizer.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/quantizer.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,MAAM,EAAQ,KAAK,EAAE,MAAM,aAAa,CAAA;;AAOjD,wBAMC"}
}
declare module 'pattern-flow/router' {
  //# sourceMappingURL=router.d.ts.map
}
declare module 'pattern-flow/router.d.ts' {
  {"version":3,"file":"router.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/router.ts"],"names":[],"mappings":""}
}
declare module 'pattern-flow/spout' {
  import { Stream } from '@most/types';
  interface SpigotSpec {
      on$: Stream<Boolean>;
      off$?: Stream<Boolean>;
      fx?: ($: Stream<any>) => any;
  }
  export const isOn: ($: Stream<any>) => Stream<any>;
  export const isOff: ($: Stream<any>) => Stream<any>;
  export const spout: import("@typed/curry").Curry2<Stream<any>, Stream<Boolean>, Stream<Stream<any>>>;
  export const spigot: import("@typed/curry").Curry2<SpigotSpec, Stream<any>, Stream<any>>;
  export const router: import("@typed/curry").Curry2<{
      string: Stream<any>;
  }, Stream<string>, Stream<Stream<any>>>;
  export {};
  //# sourceMappingURL=spout.d.ts.map
}
declare module 'pattern-flow/spout.d.ts' {
  {"version":3,"file":"spout.d.ts","sourceRoot":"","sources":["../../../home/micah/hacker-stuff/wilderplace-workspace/pattern-flow/src/spout.ts"],"names":[],"mappings":"AACA,OAAO,EAAE,MAAM,EAAE,MAAM,aAAa,CAAA;AAIpC,UAAU,UAAU;IAClB,GAAG,EAAE,MAAM,CAAC,OAAO,CAAC,CAAA;IACpB,IAAI,CAAC,EAAE,MAAM,CAAC,OAAO,CAAC,CAAA;IACtB,EAAE,CAAC,EAAE,CAAC,CAAC,EAAE,MAAM,CAAC,GAAG,CAAC,KAAK,GAAG,CAAA;CAC7B;AAED,eAAO,MAAM,IAAI,MAAO,OAAO,GAAG,CAAC,gBAA6B,CAAA;AAChE,eAAO,MAAM,KAAK,MAAO,OAAO,GAAG,CAAC,gBAA8B,CAAA;AAElE,eAAO,MAAM,KAAK,kFAOjB,CAAA;AAoBD,eAAO,MAAM,MAAM,qEAMjB,CAAA;AAEF,eAAO,MAAM,MAAM;YAA2B,OAAO,GAAG,CAAC;uCAUvD,CAAA"}
}
declare module 'pattern-flow' {
  import main = require('pattern-flow/index');
  export = main;
}