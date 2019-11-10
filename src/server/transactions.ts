import {pipe} from "fp-ts/lib/pipeable"
import {runQuery, getAll, queryAll} from "./db"

export const getTransactionsForAccount = (accountId: number) =>
  queryAll(
    `SELECT date, amount FROM account_transactions LEFT JOIN transactions ON account_transactions.transactionId = transactions.id WHERE accountId = ${accountId}`
  )
