import { Stream, Time, Timer } from '@most/types'
import { map, join, at } from '@most/core'
import { pipe } from 'fp-ts/lib/function'
import { curry } from '@typed/curry'

const nextTime = (period: Time, now: Time) => period - (now % period)

export default curry((timer: Timer, period: Time, $: Stream<any>) =>
  pipe(
    $,
    map((x) => at(nextTime(period, timer.now()), x)),
    join,
  ),
)
