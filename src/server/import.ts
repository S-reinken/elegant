import {runQuery, queryOne} from "./db"
import {map, array} from "fp-ts/lib/Array"
import {
  taskEither,
  chain,
  map as taskMap,
  TaskEither,
} from "fp-ts/lib/TaskEither"
import {flow} from "fp-ts/lib/function"
import {pipe} from "fp-ts/lib/pipeable"
import {Option, fold, map as optionMap} from "fp-ts/lib/Option"
import {AccountResult} from "src/common/types"
import {someNum, getId, emptyTask, fold2} from "src/common/functions"

type AmexTransaction = {
  Date: string
  Description: string
  Category: string
  Amount: string
}

const getAccountForCategory = (
  category: string
): TaskEither<Error, Option<AccountResult>> =>
  queryOne(`SELECT accountId FROM account_alias WHERE alias = "${category}"`)
const insertTransactionEntry = (date: string, amount: string) =>
  runQuery(
    `INSERT INTO transactions(date, amount) values("${date}", "${amount}")`
  )
const insertSendingEntry = (transactionId: number) =>
  runQuery(
    `INSERT INTO account_transactions(accountId, transactionId, isReceiver) values("1", "${transactionId}", false)`
  )
const insertReceivingEntry = (accountId: number, transactionId: number) =>
  runQuery(
    `INSERT INTO account_transactions(accountId, transactionId, isReceiver) values("${accountId}", "${transactionId}", false)`
  )

const makeInserts = (obj: AmexTransaction) =>
  pipe(
    [
      taskMap(someNum)(insertTransactionEntry(obj.Date, obj.Amount)),
      taskMap(optionMap(getId))(getAccountForCategory(obj.Category)),
    ],
    array.sequence(taskEither),
    chain(([transactionRowId, accountId]) =>
      array.sequence(taskEither)([
        fold(emptyTask, insertSendingEntry)(transactionRowId),
        fold2(emptyTask, insertReceivingEntry)(accountId, transactionRowId),
      ])
    )
  )

export const processCSVRequest = flow(
  map(makeInserts),
  array.sequence(taskEither)
)
