import * as React from "react"
import {Theme, createStyles, WithStyles, withStyles} from "@material-ui/core"
import {RootContainerStyles} from "@/renderer/common/styles/RootStyles"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...RootContainerStyles(theme),
    },
  })

const CategoriesPageComponent: React.FunctionComponent<
  WithStyles<typeof styles>
> = ({classes}) => <div className={classes.root}></div>

export const CategoriesPage = withStyles(styles)(CategoriesPageComponent)
