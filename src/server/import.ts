import {map, prop, compose} from "lodash/fp"
import {DB, mmap} from "./db"

type AmexTransaction = {
  Date: string
  Description: string
  Category: string
  Amount: string
}
const makeInserts = map(
  (obj: AmexTransaction) =>
    `INSERT INTO transactions values("${obj.Date}", "NONE", "${obj.Description}", "${obj.Category}", "${obj.Amount}")`
)
const runQuery = (q: DB<string>) => q.runQuery()

export const processCSVRequest = compose(
  runQuery,
  mmap(makeInserts),
  DB.of
)
