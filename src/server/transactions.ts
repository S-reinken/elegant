import {queryAll} from "./db"
import {TaskEither} from "fp-ts/lib/TaskEither"
import {Transaction} from "@common/types"

export const getTransactionsForAccount = (
  accountId: number
): TaskEither<Error, Transaction[]> =>
  queryAll(
    `SELECT date, name, amount FROM account_transactions
      LEFT JOIN transactions ON account_transactions.transactionId = transactions.id
      LEFT JOIN accounts     ON account_transactions.accountId = accounts.id
     WHERE NOT accounts.id = ${accountId} AND transactionId IN 
      (SELECT transactionId FROM account_transactions WHERE accountId = ${accountId})`
  )
