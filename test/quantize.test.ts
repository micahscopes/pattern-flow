
import test from 'tape'
import { runEffects, tap, take, scan, periodic } from '@most/core';
import { pipe } from 'fp-ts/function'
import { createPulsingScheduler } from 'most-pulsing-scheduler'
import { quantize } from '../src/grid';

const counter = scan((x) => x + 1, 0)

test('quantize', function (t) {
  const [timer, scheduler] = createPulsingScheduler()

  const tooEarly$ = take(50, periodic(1)) // 50 arbitrary events, too all too early

  let count = 0
  // we'll count the number of events in `$`
  const quantized$ = quantize(100, tooEarly$)

  const test$ = pipe(
    quantized$,
    counter,
    tap(x => count = x),
  )

  runEffects(test$, scheduler)

  timer.pulse(99)
  t.equals(count, 0)
  t.equals(timer.now(), 99)

  timer.pulse(1)
  t.equals(count, 50)
  t.equals(timer.now(), 100)

  t.end()
})