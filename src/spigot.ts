import { curry } from '@typed/curry'
import { Stream, } from '@most/types'
import { constant, empty, map, take, until } from '@most/core'
import { pipe } from 'fp-ts/lib/function'
import { filter } from '@most/core/dist/combinator/filter'
import { merge } from '@most/core/dist/combinator/merge'

interface SpigotSpec {
  on$: Stream<Boolean>
  off$?: Stream<Boolean>
  fx?: ($: Stream<any>) => any
}

export const isOn = ($: Stream<any>) => filter((l: any) => l, $)
export const isOff = ($: Stream<any>) => filter((l: any) => !l, $)

export const spout = curry((on$: Stream<any>, latch$: Stream<Boolean>) =>
  pipe(
    //
    latch$,
    isOn,
    constant(until(pipe(latch$, isOff, take(1)), on$)),
  ),
)

// export const anticipateTop = curry(
//   (timer: Timer, period: Time, clipEndpoint: Time, clip: Stream<any>, trigger: Stream<Boolean>) => {
//     return pipe(
//       trigger,
//       isOn,
//       take(1),
//       map(() => {
//         const nowRelativeToClip = clipEndpoint - nextTop(period, timer.now())
//         return sliceNowToEnd(nowRelativeToClip, clipEndpoint, clip)
//       }),
//     )
//   },
// )

// export const cascade = curry((flows: { Time: Stream<any> }) => {
//   pipe(flows, Record.toArray)
// })

// export const pickup = curry((anticipation: Time, pickup$: Stream<any>, latch$: Stream<Boolean>))

export const spigot = curry(({ on$, off$, fx }: SpigotSpec, latch$: Stream<any>) => {
  on$ = on$ || empty()
  off$ = off$ || empty()

  const output = merge(spout(on$, isOn(latch$)), spout(off$, isOff(latch$)))
  return fx ? map(fx, output) : output
})
