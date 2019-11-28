import {TableHead, TableRow, TableCell} from "@material-ui/core"
import {WithStyles, withStyles} from "@material-ui/styles"
import * as React from "react"
import {Table, TableBody} from "@material-ui/core"
import {styles} from "./Styles"
import {PageComponentProps} from "../Layout"
import {pipe} from "fp-ts/lib/pipeable"
import {getTransactions} from "@/renderer/common/functions"
import {fold} from "fp-ts/lib/TaskEither"
import {task} from "fp-ts/lib/Task"
import {Transaction, TransactionOrd} from "@/common/types"
import {map, sort} from "fp-ts/lib/Array"
import {flow} from "fp-ts/lib/function"
import {err} from "@/common/functions"

const createTableBody = map((transaction: Transaction) => (
  <TableRow>
    <TableCell>{transaction.date}</TableCell>
    <TableCell>{transaction.amount}</TableCell>
  </TableRow>
))

interface TransactionsPageComponentProps extends WithStyles<typeof styles> {
  rows: Transaction[]
}
interface TransactionPageProps extends PageComponentProps {
  accountId: number
}

const TransactionsPageComponent: React.FunctionComponent<TransactionsPageComponentProps> = ({
  classes,
  rows,
}) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <h1>Transactions</h1>
    </div>
    <div style={{overflowY: "scroll"}}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{createTableBody(rows)}</TableBody>
      </Table>
    </div>
  </div>
)

export const TransactionsPage: React.FunctionComponent<TransactionPageProps> = ({
  setPage,
  accountId,
}) => {
  const [rowArray, setRows] = React.useState([] as Transaction[])
  const updateRows = flow(sort(TransactionOrd), setRows, task.of)
  const getRows = pipe(getTransactions(accountId), fold(err, updateRows))

  React.useEffect(() => {
    getRows()
  }, [])
  const Component = withStyles(styles)(TransactionsPageComponent)
  return <Component rows={rowArray} />
}
