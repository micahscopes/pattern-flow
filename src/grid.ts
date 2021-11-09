import { propagateEventTask } from '@most/core'
import { Time } from '@most/types'
import { Stream, Sink, Scheduler, Disposable } from '@most/types'

class Grid implements Stream<void> {
  private readonly period: Time
  private readonly phase: Time

  constructor(period: Time, phase: Time = 0) {
    this.period = period
    this.phase = phase
  }

  run(sink: Sink<void>, scheduler: Scheduler): Disposable {
    const delay = this.period - (scheduler.currentTime() % this.period) + (this.phase % this.period)
    return scheduler.scheduleTask(0, delay, this.period, propagateEventTask(undefined, sink))
  }
}

/**
 * Create a stream of events that occur at a regular period on a grid
 * @param {Time} period periodicity of events
 * @returns {Stream} new stream of periodic events, the event value is undefined
 */
export const grid = (period: Time, phase: Time = 0): Stream<void> => new Grid(period, phase)
