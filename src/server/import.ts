import {map, prop, compose, forEach} from "lodash/fp"
import {DB, mmap, bind, runQuery} from "./db"
import {List, IO} from "monet"

type AmexTransaction = {
  Date: string
  Description: string
  Category: string
  Amount: string
}
const makeInserts = (obj: AmexTransaction) =>
  List.from([
    `INSERT INTO transactions values("${obj.Date}", "${obj.Amount}")`,
    `INSERT INTO account_transactions values("AMEX (id)", "transaction id?", false)`,
    `INSERT INTO account_transactions values("${obj.Category}", "transaction id?", true)`,
  ])

const sequenceIO = (list: List<IO<any>>) => list.sequenceIO()

export const processCSVRequest = compose(
  sequenceIO,
  mmap(runQuery),
  bind(makeInserts),
  List.from
)
