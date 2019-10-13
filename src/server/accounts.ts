import {sqlDB} from "./db"
import {IO} from "monet"
import {curry, map} from "lodash/fp"

const runQuery = (query: string) =>
  IO(() => new Promise(resolve => sqlDB.all(query, resolve)))

type Func<T> = (arg: T) => any
const pmap = curry(<T>(trans: Func<T>, ioFunc: IO<Promise<T>>) =>
  ioFunc.map(p => p.then(trans))
)
const getAll = (tableName: string) => runQuery(`SELECT * FROM ${tableName}`)

export const getAccounts = getAll("accounts")
