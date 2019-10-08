import {TableHead, TableRow, TableCell} from "@material-ui/core"
import {WithStyles, withStyles} from "@material-ui/styles"
import * as React from "react"
import {Table, TableBody} from "@material-ui/core"
import {map} from "lodash/fp"
import {styles} from "./Styles"
import {PageComponentProps} from "../Layout"

const createRow = map((item: string) => <TableCell>{item}</TableCell>)
const createTableBody = map((row: string[]) => (
  <TableRow>{createRow(row)}</TableRow>
))

interface TransactionsPageComponentProps extends WithStyles<typeof styles> {
  rows: [string, string, string, string, string][]
}

const TransactionsPageComponent: React.FunctionComponent<
  TransactionsPageComponentProps
> = ({classes, rows}) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <h1>Transactions</h1>
    </div>
    <Table className={classes.table} size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Receiver</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{createTableBody(rows)}</TableBody>
    </Table>
  </div>
)

export const TransactionsPage: React.FunctionComponent<PageComponentProps> = ({
  setPage,
}) => {
  const [rowArray, setRows] = React.useState([])
  React.useEffect(() => {
    fetch("http://localhost:8080/")
      .then(res => {
        return res.json()
      })
      .then(result => {
        setRows(result)
      })
  }, [])
  const Component = withStyles(styles)(TransactionsPageComponent)
  return <Component rows={rowArray} />
}
