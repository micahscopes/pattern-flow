import { periodic, constant, until, at, slice, withLocalTime, mergeArray } from '@most/core'
import { Time, Stream } from '@most/types'
import { pipe } from 'fp-ts/lib/function'
import { curry } from '@typed/curry'

const topWithinCycle = (clipStart: Time, clipEnd: Time, top: Time) => {
  const period: Time = clipEnd - clipStart
  return clipStart + (top % period) // get the equivalent starting point within specified loop region
}

export const ending = curry((top: Time, clipEnd: Time, period: Time, source$: Stream<any>) => {
  const clipStart = clipEnd - period;
  top = topWithinCycle(clipStart, clipEnd, top)
  return withLocalTime(clipStart, slice(clipStart, top, source$))
})

export const beginning = curry((top: Time, clipStart: Time, period: Time, source$: Stream<any>) => {
  const clipEnd = clipStart + period
  top = topWithinCycle(clipStart, clipEnd, top)
  return withLocalTime(top, slice(top, clipEnd, source$))
})

/**
* Create a cyclic clip stream from a given source stream, centered around the time given by `top`.
* @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
* @param {Time} clipStart -
* @param {Time} clipEnd -
* @param {Time} top -
* @param {Stream<T>} source$ -
* @return {Stream<T>} Brief description of the returning value here.
*/

export const periodicSlice = curry((clipStart: Time, clipEnd: Time, top: Time, source$: Stream<any>) => {
  const period = clipEnd - clipStart
  return mergeArray([
    beginning(clipStart, period, top, source$),
    at(clipEnd, ending(period, clipEnd, top, source$)),
  ])
})

export const cycle = curry((clipStart: Time, clipEnd: Time, top: Time, $: Stream<any>) => {
  return pipe(
    //
    periodic(clipEnd - clipStart),
    constant(periodicSlice(clipStart, clipEnd, top, $)),
  )
})

export default curry((duration: Time, $: Stream<any>) =>
  pipe(
    //
    periodic(duration),
    constant(until(at(duration, null), $)),
  ),
)
