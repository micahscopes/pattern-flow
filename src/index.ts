import { pipe } from 'fp-ts/function'
export const logMessage = (msg: string) => {
  pipe(
    msg,
    console.log
  )
}