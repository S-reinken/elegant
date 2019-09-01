import { Theme, createStyles } from "@material-ui/core"
import { RootContainerStyles } from "@/renderer/common/styles/RootStyles"
import { WithStyles, withStyles } from "@material-ui/styles"
import * as React from "react"
import { PageComponentProps } from "../App"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...RootContainerStyles(theme).root,
    },
    title: {
      ...RootContainerStyles(theme).title,
    },
  })

type TransactionsPageComponentProps = WithStyles<typeof styles>
const TransactionsPageComponent: React.FunctionComponent<
  TransactionsPageComponentProps
> = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <h1>Transactions</h1>
    </div>
  </div>
)

export const TransactionsPage: React.FunctionComponent<PageComponentProps> = ({
  setPage,
}) => {
  const Component = withStyles(styles)(TransactionsPageComponent)
  return <Component />
}
