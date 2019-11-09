import * as React from "react"
import {Theme, createStyles, WithStyles, withStyles} from "@material-ui/core"
import {RootContainerStyles} from "@/renderer/common/styles/RootStyles"
import {PageComponentProps} from "../Layout"
import {TreeView, TreeItem} from "@material-ui/lab"
import {ExpandMore, ChevronRight} from "@material-ui/icons"
import {Page} from "@/renderer/common/constants"
import {map} from "lodash/fp"
import {pipe} from "fp-ts/lib/pipeable"
import {getAccounts} from "@/renderer/common/functions"
import {fold} from "fp-ts/lib/TaskEither"
import {Account} from "@/common/types"
import {task} from "fp-ts/lib/Task"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...RootContainerStyles(theme).root,
    },
    title: {
      ...RootContainerStyles(theme).title,
    },
  })

type ICategoriesPageProps = WithStyles<typeof styles> & PageComponentProps

const CategoriesPageComponent: React.FunctionComponent<
  ICategoriesPageProps
> = ({classes, setPage}) => {
  const [rowArray, setRows] = React.useState([] as Account[])
  const getRows = pipe(
    getAccounts,
    fold(
      e => {
        throw e
      },
      a => task.of(setRows(a))
    )
  )
  React.useEffect(() => {
    getRows()
  }, [])
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h1>Accounts</h1>
      </div>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
      >
        {map(
          (row: any) => (
            <TreeItem nodeId={row.id} label={row.name} />
          ),
          rowArray
        )}
      </TreeView>
    </div>
  )
}

export const CategoriesPage: React.FunctionComponent<
  PageComponentProps
> = props => {
  const Component = withStyles(styles)(CategoriesPageComponent)
  return <Component {...props} />
}
