import {
  Theme,
  createStyles,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core"
import { RootContainerStyles } from "@/renderer/common/styles/RootStyles"
import { WithStyles, withStyles } from "@material-ui/styles"
import * as React from "react"
import { PageComponentProps } from "../App"
import { Table, TableBody } from "@material-ui/core"
import { map } from "lodash/fp"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...RootContainerStyles(theme).root,
    },
    title: {
      ...RootContainerStyles(theme).title,
    },
    table: {
      color: "white",
      "& th,tr,td": {
        color: "white",
      },
      minWidth: 650,
    },
  })
const rows = [
  ["8/4/2018", "Such and Such", "UBER", "Expenses:Transportation", "-13.76"],
  ["8/2/2018", "Such and Such", "UBER", "Expenses:Transportation", "-13.76"],
  ["7/14/2018", "Such and Such", "UBER", "Expenses:Transportation", "-13.76"],
  ["6/24/2018", "Such and Such", "UBER", "Expenses:Transportation", "-13.76"],
]

const createRow = map((item: string) => <TableCell>{item}</TableCell>)
const createTableBody = map((row: string[]) => (
  <TableRow>{createRow(row)}</TableRow>
))

type TransactionsPageComponentProps = WithStyles<typeof styles>
const TransactionsPageComponent: React.FunctionComponent<
  TransactionsPageComponentProps
> = ({ classes }) => (
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
  const Component = withStyles(styles)(TransactionsPageComponent)
  return <Component />
}
