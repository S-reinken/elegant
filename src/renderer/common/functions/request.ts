import {pipe} from "fp-ts/lib/pipeable"
import {Task, chain, map as taskMap} from "fp-ts/lib/Task"
import {Either, fold} from "fp-ts/lib/Either"
import {TaskEither} from "fp-ts/lib/TaskEither"
import {Account, Transaction} from "@/common/types"

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
