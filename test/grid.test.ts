import test from 'tape'
import { runEffects, tap, take, scan } from '@most/core';
import { pipe } from 'fp-ts/function'
import { createPulsingScheduler } from 'most-pulsing-scheduler'
import { grid } from '../src/grid';

const count = scan((x) => x + 1, 0)

test('grid stream', function (t) {
  const GRID_SIZE = 10
  const PHASE = 20
  const [timer, scheduler] = createPulsingScheduler()
  const grid$ = grid(GRID_SIZE, PHASE)

  // console.log('pulsing by 43 from', timer.now())
  timer.pulse(43) // advance the to some arbitrary time

  let gridCountElapsed = 0

  // we'll count the number of events in `grid$`
  const gridCountTest$ = pipe(
    grid$,
    count,
    tap(x => gridCountElapsed = x),
    take(4)
  )

  runEffects(gridCountTest$, scheduler)

  t.equals(gridCountElapsed, 0)
  t.equals(timer.now(), 43)

  // console.log('pulsing by 6 from', timer.now())
  timer.pulse(6)
  t.equals(gridCountElapsed, 0)
  t.equals(timer.now(), 49)

  // console.log('pulsing by 1 from', timer.now())
  timer.pulse(1)
  t.equals(gridCountElapsed, 1)
  t.equals(timer.now(), 50)

  // console.log('pulsing by 9 from', timer.now())
  timer.pulse(9)
  t.equals(gridCountElapsed, 1)
  t.equals(timer.now(), 59)

  // console.log('pulsing by 1 from', timer.now())
  timer.pulse(1)
  t.equals(gridCountElapsed, 2)
  t.equals(timer.now(), 60)

  t.end()
})