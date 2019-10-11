import * as React from "react"
import {Theme, createStyles, WithStyles, withStyles} from "@material-ui/core"
import {RootContainerStyles} from "@/renderer/common/styles/RootStyles"
import {PageComponentProps} from "../Layout"
import {TreeView, TreeItem} from "@material-ui/lab"
import {ExpandMore, ChevronRight} from "@material-ui/icons"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...RootContainerStyles(theme).root,
    },
    title: {
      ...RootContainerStyles(theme).title,
    },
  })

const CategoriesPageComponent: React.FunctionComponent<
  WithStyles<typeof styles>
> = ({classes}) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <h1>Categories</h1>
    </div>
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      <TreeItem nodeId={"1"} label={"Hello?"}>
        <TreeItem nodeId={"5"} label={"Hello?"} />
        <TreeItem nodeId={"6"} label={"Hello?"} />
        <TreeItem nodeId={"7"} label={"Hello?"} />
        <TreeItem nodeId={"8"} label={"Hello?"} />
      </TreeItem>
      <TreeItem nodeId={"2"} label={"Hello?"} />
      <TreeItem nodeId={"3"} label={"Hello?"} />
      <TreeItem nodeId={"4"} label={"Hello?"} />
    </TreeView>
  </div>
)

export const CategoriesPage: React.FunctionComponent<
  PageComponentProps
> = () => {
  const Component = withStyles(styles)(CategoriesPageComponent)
  return <Component />
}
