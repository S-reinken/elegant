import * as React from "react"
import {Theme, createStyles, WithStyles, withStyles} from "@material-ui/core"
import {RootContainerStyles} from "@/renderer/common/styles/RootStyles"
import {PageComponentProps} from "../Layout"

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
  </div>
)

export const CategoriesPage: React.FunctionComponent<
  PageComponentProps
> = () => {
  const Component = withStyles(styles)(CategoriesPageComponent)
  return <Component />
}
