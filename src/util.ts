import { Stream } from '@most/types'
import { filter, map, tap } from '@most/core'

export const tapConsole = (msg: any) => tap((x) => console.log(msg, x)); // eslint-disable-line

export const isOn = ($: Stream<any>) => filter((l: any) => l, $)
export const isOff = ($: Stream<any>) => filter((l: any) => !l, $)
export const invert = ($: Stream<any>) => map(x => !x, $)