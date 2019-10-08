import * as React from "react"
import {
  Theme,
  WithStyles,
  createStyles,
  Paper,
  Button,
  Grid,
} from "@material-ui/core"
import {withStyles} from "@material-ui/styles"
import {fontStyle} from "@material-ui/system"
import {Page} from "@/renderer/common/constants"
import {styles} from "./Styles"
import {PageComponentProps} from "../Layout"

interface IAccountPageComponent extends WithStyles<typeof styles> {
  itemClick: () => void
}
export const AccountPageComponent: React.FunctionComponent<
  IAccountPageComponent
> = ({itemClick, classes}) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <h1>Accounts</h1>
    </div>
    <Grid container spacing={2}>
      <Grid item>
        <Button className={classes.paper} onClick={itemClick}>
          <h4>USAA Main Checking</h4>
        </Button>
      </Grid>
      <Grid item>
        <Button className={classes.paper}>
          <h4>Skymiles Card</h4>
        </Button>
      </Grid>
      <Grid item>
        <Button className={classes.paper}>
          <h4>Uber Visa</h4>
        </Button>
      </Grid>
    </Grid>
  </div>
)

export const AccountPage: React.FunctionComponent<PageComponentProps> = ({
  setPage,
}) => {
  const clickFunction = () => setPage(Page.TRANSACTION_PAGE)
  const Component = withStyles(styles)(AccountPageComponent)
  return <Component itemClick={clickFunction} />
}
