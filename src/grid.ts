import { constant, map, multicast, join, take, withLocalTime } from '@most/core'
import { propagateEventTask } from '@most/core'
import { Time } from '@most/types'
import { Stream, Sink, Scheduler, Disposable } from '@most/types'
import { curry } from '@typed/curry'

class Grid implements Stream<void> {
  private readonly period: Time
  private readonly phase: Time
  private origin: Time = -1

  constructor(period: Time, phase: Time = -1) {
    this.period = period
    this.phase = phase
  }

  anchor(scheduler: Scheduler): void {
    this.origin = scheduler.currentTime()
    // console.log('anchoring...', scheduler.currentTime(), this)
  }

  run(sink: Sink<void>, scheduler: Scheduler): Disposable {
    if (this.origin < 0) {
      this.anchor(scheduler)
    }
    const delay = this.period - ((scheduler.currentTime() - this.origin) % this.period) + (this.phase % this.period)
    return scheduler.scheduleTask(0, delay, this.period, propagateEventTask(undefined, sink))
  }
}

/**
 * Create a stream of events that occur at a regular period on a grid
 * @param {Time} period periodicity of events
 * @returns {Stream} new stream of periodic events, the event value is undefined
 */
export const grid = (period: Time, phase: Time = 0): Stream<void> => new Grid(period, phase)

/**
 * Produce a stream that emits a given value simultaneously with the next event in a given alignment stream.
 * @param {Stream} alignment$ the stream to align to
 * @param {any} value the value to emit
 * @returns {Stream} a stream that emits the given value upon the next event in the alignment stream
 */
export const aligned = curry((alignment$: Stream<any>, value: any) => join(constant(value, take(1, alignment$))))

export const alignAll = curry((alignment$: Stream<any>, $: Stream<any>) =>
  map((value) => aligned(alignment$, value), $),
)
// export const alignAll = curry((alignment$: Stream<any>, $: Stream<any>) => {
//   alignment$ = startWith(null, alignment$)
//   return join(join(
//     //
//     map(
//       () =>
//         map(
//           (accumulated: Stream<any>[]) => mergeArray(accumulated),
//           sample(
//             scan((values: any[], x) => [...values, now(x)], [], since(now(null), $)),
//             take(1, alignment$),
//           ),
//         ),
//       alignment$,
//     ),
//   ))
// })

export const quantize = curry((period: Time, $: Stream<any>) => {
  const grid$ = multicast(grid(period))
  return alignAll(withLocalTime(0, grid$), $)
})

// TODO: these don't seem to work consistently in higher order streams :/
