import test from 'tape'
import { runEffects, tap, periodic, scan, take, debounce } from '@most/core';
import { pipe } from 'fp-ts/function'
import { createPulsingScheduler } from 'most-pulsing-scheduler'
import { beginning, ending, clipPeriodic } from '../src/cyclical';
import { tapConsole } from '../src/util'

const count = scan((x) => x + 1, 0)

test('beginning & ending', function (t) {
  const [timer, scheduler] = createPulsingScheduler()

  const test$ = pipe(periodic(2), take(100))

  const beginningTest$ = pipe(
    beginning(0, 10, 8, test$),
    count,
    debounce(20),
    // should take the last 2 events from `test$`
    tap((result) => t.equal(result, 2)),
    tapConsole('number of items in beginning stream:'),
  )

  const endTest$ = pipe(
    ending(0, 10, 8, test$),
    count,
    debounce(20),
    // should take the first 8 events from `test$`
    tap((result) => t.equal(result, 8)),
    tapConsole('number of items in ending stream'),
  )

  runEffects(beginningTest$, scheduler)
  timer.pulse(100)

  runEffects(endTest$, scheduler)
  timer.pulse(100)

  t.end()
})

test.only('clipPeriodic', function (t) {
  const [timer, scheduler] = createPulsingScheduler()

  const sequential$ = pipe(periodic(1), count, take(100))

  const simpleClipTest$ = pipe(
    // take items 10 - 20, starting with item 15
    clipPeriodic(10, 20, 15, sequential$),
    // join,
    count,
    debounce(100),
    // count items and make sure there are 10
    tap((result) => t.equal(result, 10)),
    // tapConsole('periodic clip count:'),
  )
  runEffects(simpleClipTest$, scheduler)

  const complexClipTest$ = pipe(
    // take items 10 - 20, starting with item 16, i.e.
    // 16 ... 20, 10 ... 15
    clipPeriodic(10, 20, 16, sequential$),
    // join,
    debounce(100),
    // the final item should be item #15
    tap((result) => t.equal(result, 15)),
    // tapConsole('last item in simple clip test:'),
  )

  runEffects(complexClipTest$, scheduler)
  timer.pulse(100)

  t.end()
})