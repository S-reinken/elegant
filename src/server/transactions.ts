import {queryAll} from "./db"

export const getTransactionsForAccount = (accountId: number) =>
  queryAll(
    `SELECT date, name, amount FROM account_transactions
      LEFT JOIN transactions ON account_transactions.transactionId = transactions.id
      LEFT JOIN accounts     ON account_transactions.accountId = accounts.id WHERE transactionId IN 
        (SELECT transactionId FROM account_transactions WHERE accountId = ${accountId})`
  )
