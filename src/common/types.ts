import {Ord} from "fp-ts/lib/Ord"

export type Account = {
  id: number
  name: string
  balance: number
  isAsset: boolean
}

export type Transaction = {
  date: string
  amount: number
}
export const TransactionOrd: Ord<Transaction> = {
  compare: (trans1, trans2) => (trans1.date < trans2.date ? -1 : 1),
  equals: (trans1, trans2) => trans1 === trans2,
}

export type AccountResult = {accountId: number}
