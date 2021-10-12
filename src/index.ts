import { pipe } from 'fp-ts/function'

export * from './cyclical'

export const logMessage = (msg: string) => {
  pipe(
    msg,
    console.log
  )
}