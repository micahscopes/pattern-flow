import { Time } from '@most/types';
import { Stream } from '@most/types';
/**
 * Create a stream of events that occur at a regular period on a grid
 * @param {Time} period periodicity of events
 * @returns {Stream} new stream of periodic events, the event value is undefined
 */
export declare const grid: (period: Time, phase?: Time) => Stream<void>;
/**
 * Produce a stream that emits a given value simultaneously with the next event in a given alignment stream.
 * @param {Stream} alignment$ the stream to align to
 * @param {any} value the value to emit
 * @returns {Stream} a stream that emits the given value upon the next event in the alignment stream
 */
export declare const aligned: import("@typed/curry").Curry2<Stream<any>, any, Stream<unknown>>;
export declare const alignAll: import("@typed/curry").Curry2<Stream<any>, Stream<any>, Stream<Stream<unknown>>>;
export declare const quantize: import("@typed/curry").Curry2<number, Stream<any>, Stream<Stream<unknown>>>;
//# sourceMappingURL=grid.d.ts.map