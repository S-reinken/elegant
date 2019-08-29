import * as React from "react"
import { Theme, WithStyles, createStyles, Paper, Button, Grid } from "@material-ui/core"
import { withStyles } from "@material-ui/styles";
import { fontStyle } from "@material-ui/system";

const styles = (theme: Theme) => createStyles({
    root: {
        "& h1,h2": {
            boxSizing: "border-box",
            margin: "0",
            fontWeight: "normal",
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
    paper: {
        borderRadius: "0",
        display: "flex",
        flexDirection: "row",
        textAlign: "start",
        justifyContent: "space-between",
        alignItems: "flex-start",
        background: theme.palette.primary.main,
        padding: theme.spacing(1),
        color: "white",
        height: "100px",
        width: "200px"
    }
})

type IAccountPageComponent = WithStyles<typeof styles>
export const AccountPageComponent: React.FunctionComponent<IAccountPageComponent> = ({ classes }) => (
    <div className={classes.root}>
        <h1>Accounts</h1>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
                <Button className={classes.paper}><h2>USAA Main Checking</h2></Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Button className={classes.paper}><h2>Skymiles Card</h2></Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Button className={classes.paper}><h2>Uber Visa</h2></Button>
            </Grid>
        </Grid>
    </div>
)

export const AccountPage = withStyles(styles)(AccountPageComponent)