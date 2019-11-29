import * as sqlite3 from "sqlite3"
import {tryCatch} from "fp-ts/lib/TaskEither"
import {Option, fromNullable} from "fp-ts/lib/Option"

export const sqlDB = new sqlite3.Database("./elegant.db", err => {
  if (err) {
    console.error(err.message)
  }
  console.log("Connected to the elegant database.")
})

export const getAll = (tableName: string) =>
  queryAll(`SELECT * FROM ${tableName}`)

export const queryAll = (query: string) =>
  tryCatch<Error, any[]>(
    () =>
      new Promise((resolve, reject) =>
        sqlDB.all(query, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      ),
    error =>
      new Error(`Error with query: ${query}\nError: ${JSON.stringify(error)}`)
  )

export const queryOne = (query: string) =>
  tryCatch<Error, Option<any>>(
    () =>
      new Promise((resolve, reject) =>
        sqlDB.get(query, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(fromNullable(res))
          }
        })
      ),
    error =>
      new Error(`Error with query: ${query}\nError: ${JSON.stringify(error)}`)
  )

export const runQuery = (query: string) =>
  tryCatch<Error, number>(
    () =>
      new Promise((resolve, reject) =>
        sqlDB.run(query, function(err) {
          if (err) {
            reject(err)
          } else {
            resolve(this.lastID)
          }
        })
      ),
    error =>
      new Error(`Error with query: ${query}\nError: ${JSON.stringify(error)}`)
  )
