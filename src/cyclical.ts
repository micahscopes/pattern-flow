import { periodic, constant, until, at, slice, withLocalTime, mergeArray } from '@most/core'
import { Time, Stream } from '@most/types'
import { pipe } from 'fp-ts/lib/function'
import { curry } from '@typed/curry'

const phaseWithinCycle = (clipStart: Time, clipEnd: Time, phase: Time) => {
  const period: Time = clipEnd - clipStart
  return clipStart + (phase % period) // get the equivalent starting point within specified loop region
}

export const beginning = curry((A: Time, B: Time, phase: Time, source$: Stream<any>) => {
  phase = phaseWithinCycle(A, B, phase)
  return withLocalTime(phase, slice(phase, B, source$))
})

export const ending = curry((A: Time, B: Time, phase: Time, source$: Stream<any>) => {
  phase = phaseWithinCycle(A, B, phase)
  return withLocalTime(A, slice(A, phase, source$))
})

/**
* Create a cyclic clip stream from a given source stream, centered around the time given by `phase`.
* @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
* @param {Time} clipStart -
* @param {Time} clipEnd -
* @param {Time} phase -
* @param {Stream<T>} source$ -
* @return {Stream<T>} Brief description of the returning value here.
*/

export const clipPeriodic = curry((A: Time, phase: Time, B: Time, source$: Stream<any>) => {
  return mergeArray([
    beginning(A, B, phase, source$),
    at(B, ending(A, B, phase, source$)),
  ])
})

export const cycle = curry((A: Time, B: Time, phase: Time, $: Stream<any>) => {
  return pipe(
    //
    periodic(B - A),
    constant(clipPeriodic(A, B, phase, $)),
  )
})

export default curry((duration: Time, $: Stream<any>) =>
  pipe(
    //
    periodic(duration),
    constant(until(at(duration, null), $)),
  ),
)
