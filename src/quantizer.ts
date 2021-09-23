import { Stream, Time, Timer } from '@most/types'
import { map, join, at } from '@most/core'
import { pipe } from 'fp-ts/lib/function'

const nextTime = (period: Time, now: Time) => period - (now % period)

export default (timer: Timer) => (period: Time) => (stream: Stream<any>) =>
  pipe(
    stream,
    map((x) => at(nextTime(period, timer.now()), x)),
    join,
  )
