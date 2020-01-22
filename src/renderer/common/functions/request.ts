import {pipe} from "fp-ts/lib/pipeable"
import {Task, chain, map as taskMap} from "fp-ts/lib/Task"
import {Either, fold} from "fp-ts/lib/Either"
import {TaskEither} from "fp-ts/lib/TaskEither"
import {Account, Transaction, Alias} from "@/common/types"

export const request = (
  url: string,
  body?: RequestInit
): Task<Response> => () => fetch(url, body)

const getJSON = (res: Response): TaskEither<Error, any> => () =>
  res.json() as Promise<Either<Error, any>>

export const getAccounts: TaskEither<Error, Account[]> = pipe(
  request("http://localhost:8080/accounts"),
  chain(getJSON)
)
export const getTransactions = (
  accountId: number
): TaskEither<Error, Transaction[]> =>
  pipe(
    request(`http://localhost:8080/transactions/${accountId}`),
    chain(getJSON)
  )
export const getAliases: TaskEither<Error, Alias[]> = pipe(
  request("http://localhost:8080/aliases"),
  chain(getJSON)
)
export const setAlias = (a: Alias) =>
  request("http://localhost:8080/setAlias", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(a),
  })
