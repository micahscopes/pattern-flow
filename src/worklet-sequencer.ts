declare var currentTime: number

import { createPulsingScheduler, PulsingTimer } from 'most-pulsing-scheduler'
import { Scheduler } from '@most/types'

const BEATS_IN_BAR = 4
const TICKS_IN_BEAT = 960
const DEFAULT_TEMPO = 110

export interface SequencerOptions {
  tempo: number
  ticksInBeat: number
  beatsInBar: number
}

export default class Sequencer {
  protected _playing = false
  protected _triggerStop = false
  get playing() {
    return this._playing
  }

  protected _originPulses = 0
  protected _origin = 0

  protected _tempo = -1
  get tempo() {
    return this._tempo
  }
  set tempo(t: number) {
    this._tempo = t
    this.setOriginNow()
  }

  public ticksInBeat: number
  public beatsInBar: number
  get ticksInBar() {
    return this.ticksInBeat * this.beatsInBar
  }

  protected _timer: PulsingTimer
  get timer() {
    return this._timer
  }
  protected _scheduler: Scheduler
  get scheduler() {
    return this._scheduler
  }

  constructor({ tempo = DEFAULT_TEMPO, ticksInBeat = TICKS_IN_BEAT, beatsInBar = BEATS_IN_BAR }: SequencerOptions) {
    this.beatsInBar = beatsInBar
    this.ticksInBeat = ticksInBeat
    this.tempo = tempo
    ;[this._timer, this._scheduler] = createPulsingScheduler()
  }

  play() {
    this._playing = true
  }

  pause() {
    this._playing = false
  }

  setOriginNow() {
    this._origin = currentTime
    this._originPulses = this.timer.now()
  }

  progress() {
    if (!this.playing) {
      return false
    }
    const beatsInSec = this._tempo / 60
    const pulsesInSec = beatsInSec * this.ticksInBeat
    const timeElapsed = currentTime - this._origin
    const pulseDuration = Math.round(timeElapsed * pulsesInSec) - (this.timer.now() - this._originPulses)
    this.timer.pulse(pulseDuration)

    return true
  }
}
