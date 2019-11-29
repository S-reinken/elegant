import * as React from "react"
import {PageComponentProps} from "../Layout"
import {mergeClasses, WithStyles} from "@material-ui/styles"
import {styles} from "./Styles"
import {withStyles} from "@material-ui/core"

interface MappingsPageProps extends PageComponentProps {}

interface MappingsPageComponentProps extends WithStyles<typeof styles> {}

export const MappingsPageComponent: React.FunctionComponent<MappingsPageComponentProps> = ({
  classes,
}) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <h1>Edit Mappings</h1>
    </div>
  </div>
)

export const MappingsPage: React.FunctionComponent<MappingsPageProps> = setPage => {
  const Component = withStyles(styles)(MappingsPageComponent)
  return <Component />
}
