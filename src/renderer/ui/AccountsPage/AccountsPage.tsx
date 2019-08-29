import * as React from "react"
import { Theme, WithStyles, createStyles } from "@material-ui/core"
import { withStyles } from "@material-ui/styles";

const styles = (theme: Theme) => createStyles({
    root: {
        background: theme.palette.primary.dark,
        width: "100vw",
        height: "100vh",
        color: "white",
    }
})

type IAccountPageComponent = WithStyles<typeof styles>
export const AccountPageComponent: React.FunctionComponent<IAccountPageComponent> = ({ classes }) => (
    <div className={classes.root}>
        I am the root
    </div>
)

export const AccountPage = withStyles(styles)(AccountPageComponent)