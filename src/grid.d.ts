import { Time } from '@most/types';
import { Stream } from '@most/types';
/**
 * Create a stream of events that occur at a regular period on a grid
 * @param {Time} period periodicity of events
 * @returns {Stream} new stream of periodic events, the event value is undefined
 */
export declare const grid: (period: Time, phase?: Time) => Stream<void>;
//# sourceMappingURL=grid.d.ts.map