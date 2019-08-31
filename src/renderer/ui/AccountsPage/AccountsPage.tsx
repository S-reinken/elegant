import * as React from "react"
import {
  Theme,
  WithStyles,
  createStyles,
  Paper,
  Button,
  Grid
} from "@material-ui/core"
import { withStyles } from "@material-ui/styles"
import { fontStyle } from "@material-ui/system"
import { PageComponentProps } from "../App"
import { Page } from "@/renderer/common/constants"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      "& h1,h4": {
        display: "flex",
        boxSizing: "border-box",
        margin: "0",
        fontWeight: "normal"
      },
      padding: theme.spacing(1),
      background: theme.palette.primary.dark,
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      width: "100vw",
      height: "100vh",
      color: "white",
      fontFamily: "Roboto",
      fontStyle: "regular"
    },
    title: {
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.primary.light,
      marginBottom: theme.spacing(1)
    },
    paper: {
      borderRadius: "0",
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      justifyContent: "space-between",
      alignItems: "flex-start",
      background: theme.palette.primary.main,
      padding: theme.spacing(1),
      color: "white",
      height: "100px",
      width: "200px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light
      }
    }
  })

interface IAccountPageComponent extends WithStyles<typeof styles> {
  itemClick: () => void
}
export const AccountPageComponent: React.FunctionComponent<
  IAccountPageComponent
> = ({ itemClick, classes }) => (
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
  setPage
}) => {
  const clickFunction = () => setPage(Page.TRANSACTION_PAGE)
  const Component = withStyles(styles)(AccountPageComponent)
  return <Component itemClick={clickFunction} />
}
