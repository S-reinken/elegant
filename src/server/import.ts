import {runQuery} from "./db"
import {map, array} from "fp-ts/lib/Array"
import {taskEither, chain} from "fp-ts/lib/TaskEither"
import {flow} from "fp-ts/lib/function"
import {pipe} from "fp-ts/lib/pipeable"

type AmexTransaction = {
  Date: string
  Description: string
  Category: string
  Amount: string
}
const makeInserts = (obj: AmexTransaction) =>
  pipe(
    runQuery(
      `INSERT INTO transactions(date, amount) values("${obj.Date}", "${obj.Amount}")`
    ),
    chain(result =>
      array.sequence(taskEither)([
        runQuery(
          `INSERT INTO account_transactions(accountId, transactionId, isReceiver) values("1", "${result}", false)`
        ),
        runQuery(
          `INSERT INTO account_transactions(accountId, transactionId, isReceiver) values("2", "${result}", true)`
        ),
      ])
    )
  )

export const processCSVRequest = flow(
  map(makeInserts),
  array.sequence(taskEither)
)
