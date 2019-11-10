import * as sqlite3 from "sqlite3"
import {tryCatch} from "fp-ts/lib/TaskEither"

export const sqlDB = new sqlite3.Database("./elegant.db", err => {
  if (err) {
    console.error(err.message)
  }
  console.log("Connected to the elegant database.")
})

export const getAll = (tableName: string) =>
  queryAll(`SELECT * FROM ${tableName}`)

export const queryAll = (query: string) =>
  tryCatch<Error, string[]>(
    () => new Promise(resolve => sqlDB.all(query, (err, res) => resolve(res))),
    error => new Error(String(error))
  )

export const runQuery = (query: string) =>
  tryCatch<Error, number>(
    () =>
      new Promise(resolve =>
        sqlDB.run(query, function(err) {
          if (err) {
            throw err
          }
          resolve(this.lastID)
        })
      ),
    error => new Error(String(error))
  )
