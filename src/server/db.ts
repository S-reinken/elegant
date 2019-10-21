import * as sqlite3 from "sqlite3"
import {forEach, curry} from "lodash/fp"
import {IO, IMonad} from "monet"
import {taskify, tryCatch} from "fp-ts/lib/TaskEither"

export const sqlDB = new sqlite3.Database("./elegant.db", err => {
  if (err) {
    console.error(err.message)
  }
  console.log("Connected to the elegant database.")
})

export class DB<T> {
  db = sqlDB
  private constructor(private value: T) {}

  static of<T>(value: T) {
    return new DB(value)
  }

  map<R>(f: (wrapped: T) => R): DB<R> {
    return DB.of(f(this.value))
  }

  bind<R>(f: (wrapped: T) => DB<R>): DB<R> {
    return f(this.value)
  }

  runQuery() {
    const res = this.value as any
    forEach((item: any) => this.db.run(`${item}`), res)
  }
}
export const mmap = curry(<A, B>(fn: (arg: A) => B, monad: IMonad<A>) =>
  monad.map(fn)
)

export const bind = curry(<A, B>(fn: (arg: A) => IMonad<B>, monad: IMonad<A>) =>
  monad.flatMap(fn)
)

// export const queryAll = (query: string) =>
//   IO(() => new Promise(resolve => sqlDB.all(query, (err, res) => resolve(res))))

export const queryAll = (query: string) =>
  tryCatch<Error, string[]>(
    () => new Promise(resolve => sqlDB.all(query, (err, res) => resolve(res))),
    error => new Error(String(error))
  )

export const runQuery = (query: string) =>
  tryCatch<Error, sqlite3.RunResult>(
    () =>
      new Promise(resolve =>
        sqlDB.run(query, () => {
          console.log(`Object: ${String(this)}`)
          resolve(this.lastId)
        })
      ),
    error => new Error(String(error))
  )

// export const runQuery = (query: string) =>
//   IO(() => new Promise(resolve => sqlDB.run(query, res => resolve(res))))
