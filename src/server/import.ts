import {runQuery, queryAll, queryOne} from "./db"
import {map, array} from "fp-ts/lib/Array"
import {taskEither, chain, map as taskMap} from "fp-ts/lib/TaskEither"
import {flow} from "fp-ts/lib/function"
import {pipe} from "fp-ts/lib/pipeable"

type AmexTransaction = {
  Date: string
  Description: string
  Category: string
  Amount: string
}

const getAccountForCategory = (category: string) =>
  queryOne(`SELECT accountId FROM account_alias WHERE alias = "${category}"`)
const insertTransactionEntry = (date: string, amount: string) =>
  runQuery(
    `INSERT INTO transactions(date, amount) values("${date}", "${amount}")`
  )
const insertSendingEntry = (transactionId: string) =>
  runQuery(
    `INSERT INTO account_transactions(accountId, transactionId, isReceiver) values("1", "${transactionId}", false)`
  )
const insertReceivingEntry = (accountId: string, transactionId: string) =>
  runQuery(
    `INSERT INTO account_transactions(accountId, transactionId, isReceiver) values("${accountId}", "${transactionId}", false)`
  )
const makeString = (arg: any) => String(arg)
const makeInserts = (obj: AmexTransaction) =>
  pipe(
    [
      taskMap(makeString)(insertTransactionEntry(obj.Date, obj.Amount)),
      getAccountForCategory(obj.Category),
    ],
    array.sequence(taskEither),
    chain(([transactionRowId, accountId]) =>
      array.sequence(taskEither)([
        insertSendingEntry(transactionRowId),
        insertReceivingEntry(accountId, transactionRowId),
      ])
    )
  )

const trace = <X>(arg: X) => {
  console.log(JSON.stringify(arg))
  return arg
}
export const processCSVRequest = flow(
  map(makeInserts),
  array.sequence(taskEither)
)
