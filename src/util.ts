import { Stream } from '@most/types'
import { filter } from '@most/core'

import { pipe } from 'fp-ts/function'

export const logMessage = (msg: string) => {
  pipe(msg, console.log)
}
export const isOn = ($: Stream<any>) => filter((l: any) => l, $)
export const isOff = ($: Stream<any>) => filter((l: any) => !l, $)
