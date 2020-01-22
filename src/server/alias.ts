import {Alias} from "@common/types"
import {runQuery} from "./db"
import {trace} from "@common/functions"

export const updateAliasById = (a: Alias) =>
  runQuery(
    `UPDATE account_alias SET accountId = ${a.accountId}, alias = "${a.alias}" WHERE id = ${a.id}`
  )
