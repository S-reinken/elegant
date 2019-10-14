import * as React from "react"
import {Theme, createStyles, WithStyles, withStyles} from "@material-ui/core"
import {RootContainerStyles} from "@/renderer/common/styles/RootStyles"
import {PageComponentProps} from "../Layout"
import {TreeView, TreeItem} from "@material-ui/lab"
import {ExpandMore, ChevronRight} from "@material-ui/icons"
import {Page} from "@/renderer/common/constants"
import {map} from "lodash/fp"

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
  let accounts = {}
  const [rowArray, setRows] = React.useState([])
  React.useEffect(() => {
    fetch("http://localhost:8080/accounts")
      .then(res => res.json())
      .then(setRows)
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
        {/* <TreeItem nodeId={"24"} label={"Assets"}>
          <TreeItem nodeId={"25"} label={"Checking Account"} />
          <TreeItem
            nodeId={"26"}
            label={"Savings Account"}
            onClick={() =>
              setPage({component: Page.TRANSACTION_PAGE, props: {}})
            }
          />
        </TreeItem>
        <TreeItem nodeId={"1"} label={"Income"}>
          <TreeItem nodeId={"5"} label={"Salary"} />
          <TreeItem nodeId={"6"} label={"Investments"} />
        </TreeItem>
        <TreeItem nodeId={"2"} label={"Expenses"}>
          <TreeItem nodeId={"15"} label={"Auto"}>
            <TreeItem nodeId={"16"} label={"Gas"} />
            <TreeItem nodeId={"17"} label={"Maintenance"} />
          </TreeItem>
          <TreeItem nodeId={"4"} label={"Food"}>
            <TreeItem nodeId={"18"} label={"Dining"} />
            <TreeItem nodeId={"19"} label={"Groceries"} />
            <TreeItem nodeId={"20"} label={"Delivery"} />
          </TreeItem>
          <TreeItem nodeId={"9"} label={"Rent"} />
          <TreeItem nodeId={"10"} label={"Utilities"}>
            <TreeItem nodeId={"11"} label={"Water"} />
            <TreeItem nodeId={"12"} label={"Gas"} />
            <TreeItem nodeId={"13"} label={"Electricity"} />
            <TreeItem nodeId={"14"} label={"Internet"} />
          </TreeItem>
          <TreeItem nodeId={"21"} label={"Entertainment"}>
            <TreeItem nodeId={"22"} label={"Games"} />
            <TreeItem nodeId={"23"} label={"Shows"} />
          </TreeItem>
        </TreeItem> */}
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
