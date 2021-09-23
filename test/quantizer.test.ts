import test from 'tape'
import { runEffects, tap, at, mergeArray} from '@most/core'
import quantizer from '../src/quantizer'
import { pipe } from 'fp-ts/function'
import {createPulsingScheduler} from 'most-pulsing-scheduler'

test('quantizer', function (t) {
  const [timer, scheduler] = createPulsingScheduler()
  const quantize = quantizer(timer)

  let i = 0;

  const test$ = pipe(
    mergeArray([
      at(3, null),
      at(7, null),
      at(13, null)
    ]),
    quantize(5),
    tap(() => i++),
  )

  runEffects(test$, scheduler)

  timer.pulse(4); // pulse to 4
  t.equal(i, 0);
  timer.pulse(1); // pulse to 5
  t.equal(i, 1);
  timer.pulse(4); // pulse to 9
  t.equal(i, 1);
  timer.pulse(1); // pulse to 10
  t.equal(i, 2);
  timer.pulse(4); // pulse to 14
  t.equal(i, 2);
  timer.pulse(1); // pulse to 15
  t.equal(i, 3);

  t.end()
});
