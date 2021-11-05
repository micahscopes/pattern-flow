import { Stream } from '@most/types';
export declare const beginning: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<any>>;
export declare const ending: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<any>>;
/**
* Create a cyclic clip stream from a given source stream, centered around the time given by `phase`.
* @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
* @param {Time} clipStart -
* @param {Time} clipEnd -
* @param {Time} phase -
* @param {Stream<T>} source$ -
* @return {Stream<T>} Brief description of the returning value here.
*/
export declare const clipPeriodic: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<any>>;
export declare const cycle: import("@typed/curry").Curry4<number, number, number, Stream<any>, Stream<Stream<any>>>;
declare const _default: import("@typed/curry").Curry2<number, Stream<any>, Stream<Stream<any>>>;
export default _default;
//# sourceMappingURL=cyclical.d.ts.map