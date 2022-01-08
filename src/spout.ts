import { curry } from '@typed/curry'
import { Stream } from '@most/types'
import {
  sample,
  constant,
  empty,
  map,
  until,
  filter,
  merge,
  skipRepeats,
  mergeArray,
  combine,
  switchLatest,
  at,
  zip,
  skip,
  startWith,
  join,
  multicast,
} from '@most/core'
import { isOff, isOn } from './util'
import { difference } from 'set-ops'

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

export const wrappedFlowLatch = curry(
  (wrap: ($: Stream<any>) => Stream<any>, flow$: Stream<any>, latch$: Stream<Boolean>) => {
    const trimmedFlow$ = wrap(until(isOff(latch$), flow$))
    return constant(trimmedFlow$, isOn(latch$))
  },
)

export const flowLatch = curry((flow$: Stream<any>, latch$: Stream<Boolean>) =>
  wrappedFlowLatch(($: Stream<any>) => $, flow$, latch$),
)

export const latchFlow = curry((latch$: Stream<Boolean>, flow$: Stream<any>) => flowLatch(flow$, latch$))

export const latchWrappedFlow = curry(
  (latch$: Stream<Boolean>, wrap: (x: Stream<any>) => Stream<any>, flow$: Stream<any>) =>
    wrappedFlowLatch(wrap, flow$, latch$),
)

export const spout = flowLatch

export const stutter = curry((delayOn: number, delayOff: number, $: Stream<any>) =>
  switchLatest(map((x) => (x ? at(delayOn, x) : at(delayOff, x)), $)),
)

export const asLatch = ($: Stream<any>) => stutter(0, 0, $)

export const spigot = curry(({ on$, off$, fx }: SpigotSpec, latch$: Stream<any>) => {
  on$ = on$ || empty()
  off$ = off$ || empty()

  const output = merge(flowLatch(on$, isOn(latch$)), flowLatch(off$, isOff(latch$)))
  return fx ? map(fx, output) : output
})

export type routeKey = string

export const router = curry((routes: { [key: string]: Stream<any> }, control$: Stream<Set<routeKey>>) => {
  // control$ = multicast(skipRepeats(control$))
  control$ = startWith(new Set(), control$)
  const laggedControl$ = skip(1, control$)
  const added$ = multicast(zip((older, newer) => difference(newer, older), control$, laggedControl$))
  const removed$ = multicast(zip((older, newer) => difference(older, newer), control$, laggedControl$))
  const mergedFlow$ = map(
    (added) =>
      mergeArray(
        [...(added as Set<string>)].map((routeKey) =>
          until(
            filter(
              (removedKeys: Set<string>) => removedKeys.has(routeKey),
              // tap((x) => console.log('PF: removed', x), removed$),
              removed$,
            ),
            routeKey in routes ? routes[routeKey] : empty(),
          ),
        ),
      ),
    // tap((x) => console.log('PF: added', x), added$),
    added$,
  )

  return join(mergedFlow$)
})
