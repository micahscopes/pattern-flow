import { curry } from '@typed/curry'
import { Stream } from '@most/types'
import {
  sample,
  constant,
  empty,
  map,
  take,
  until,
  filter,
  merge,
  skipRepeats,
  mergeArray,
  multicast,
  combine,
  switchLatest,
  at,
} from '@most/core'
import { isOff, isOn } from './util'

interface SpigotSpec {
  on$: Stream<Boolean>
  off$?: Stream<Boolean>
  fx?: ($: Stream<any>) => any
}

// throttle + sample
export const sampler = curry((sample$: Stream<any>, flow$: Stream<any>) => sample(flow$, sample$))
export const regulate = sampler


const DISCARD = Symbol()

// when latch is on, disallow flow
export const muffle = curry((latch$: Stream<Boolean>, flow$: Stream<any>) => {
  return filter(
    (x) => !(x === DISCARD),
    combine((latch: boolean, x: any) => (!latch ? x : DISCARD), skipRepeats(latch$), flow$),
  )
})

// when latch is on, allow flow
export const release = curry((latch$: Stream<Boolean>, flow$: Stream<any>) => {
  return filter(
    (x) => !(x === DISCARD),
    combine((latch: boolean, x: any) => (latch ? x : DISCARD), skipRepeats(latch$), flow$),
  )
})

export const flowLatch = curry((flow$: Stream<any>, latch$: Stream<Boolean>) => {
  const trimmedFlow$ = until(isOff(latch$), flow$)
  return constant(trimmedFlow$, isOn(latch$))
})

export const spout = flowLatch

export const stutter = curry((delayOn: number, delayOff: number, $: Stream<any>) =>
  skipRepeats(switchLatest(map((x) => (x ? at(delayOn, x) : at(delayOff, x)), $))),
)

export const asLatch = ($: Stream<any>) => stutter(0, 0, $)


export const latchFlow = curry((latch$: Stream<Boolean>, flow$: Stream<any>) => flowLatch(flow$, latch$))

export const spigot = curry(({ on$, off$, fx }: SpigotSpec, latch$: Stream<any>) => {
  on$ = on$ || empty()
  off$ = off$ || empty()

  const output = merge(flowLatch(on$, isOn(latch$)), flowLatch(off$, isOff(latch$)))
  return fx ? map(fx, output) : output
})

export type routeKey = string

export const router = curry((routes: { route: Stream<any> }, control$: Stream<routeKey | Set<routeKey>>) => {
  control$ = multicast(skipRepeats(control$))
  const mergedFlow$ = mergeArray(
    Object.entries(routes).map(([routeKey, flow$]) =>
      flowLatch(
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
