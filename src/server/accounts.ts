import {sqlDB, queryAll} from "./db"
import {IO} from "monet"
// import {curry, map} from "lodash/fp"
// type Func<T> = (arg: T) => any
// const pmap = curry(<T>(trans: Func<T>, ioFunc: IO<Promise<T>>) =>
//   ioFunc.map(p => p.then(trans))
// )
export const getAll = (tableName: string) =>
  queryAll(`SELECT * FROM ${tableName}`)
