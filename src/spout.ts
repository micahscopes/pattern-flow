import { curry } from '@typed/curry'
import { Stream } from '@most/types'
import { constant, empty, map, take, until, filter, merge, skipRepeats, mergeArray, multicast } from '@most/core'
import { isOff, isOn } from './util';

interface SpigotSpec {
  on$: Stream<Boolean>
  off$?: Stream<Boolean>
  fx?: ($: Stream<any>) => any
}

export const spout = curry((flow$: Stream<any>, latch$: Stream<Boolean>) => {
  const trimmedFlow$ = until(isOff(latch$), flow$)
  return constant(trimmedFlow$, isOn(latch$))
})

export const spigot = curry(({ on$, off$, fx }: SpigotSpec, latch$: Stream<any>) => {
  on$ = on$ || empty()
  off$ = off$ || empty()

  const output = merge(spout(on$, isOn(latch$)), spout(off$, isOff(latch$)))
  return fx ? map(fx, output) : output
})

export type routeKey = string

export const router = curry((routes: { route: Stream<any> }, control$: Stream<routeKey | Set<routeKey>>) => {
  control$ = multicast(skipRepeats(control$))
  const mergedFlow$ = mergeArray(
    Object.entries(routes).map(([routeKey, flow$]) =>
      spout(
        //
        flow$,
        isOn(filter((controlKey) => controlKey === routeKey || (controlKey as Set<routeKey>).has(routeKey), control$)),
      ),
    ),
  )
  const finished$ = take(
    1,
    filter((x) => x === null, control$),
  )
  return until(finished$, mergedFlow$)
})
