import * as React from "react"
import { AccountPage } from "./AccountsPage";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
// export const App = () => <AccountPage/>

const theme = createMuiTheme({})

export const App = () => (
    <ThemeProvider theme={theme}>
        <AccountPage />
    </ThemeProvider>
)