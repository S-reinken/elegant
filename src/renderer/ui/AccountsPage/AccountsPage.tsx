import * as React from "react"
import { Theme, WithStyles, createStyles } from "@material-ui/core"
import { withStyles } from "@material-ui/styles";

const styles = (theme: Theme) => createStyles({
    root: {
        "& h1": {
            boxSizing: "border-box",
            margin: "0",
            padding: theme.spacing(1)
        },
        background: theme.palette.primary.dark,
        display: "flex",
        boxSizing: "border-box",
        width: "100vw",
        height: "100vh",
        color: "white",
        fontFamily: "Roboto"
    }
})

type IAccountPageComponent = WithStyles<typeof styles>
export const AccountPageComponent: React.FunctionComponent<IAccountPageComponent> = ({ classes }) => (
    <div className={classes.root}>
        <h1>Accounts</h1>
    </div>
)

export const AccountPage = withStyles(styles)(AccountPageComponent)