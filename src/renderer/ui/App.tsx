import * as React from "react"
import {AccountPage} from "./AccountsPage"
import {ThemeProvider} from "@material-ui/styles"
import {createMuiTheme} from "@material-ui/core"
import {Page} from "../common/constants"
import {TransactionsPage} from "./TransactionsPage"
import {MainLayout} from "./Layout"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1C1C1C",
      light: "#262626",
      dark: "#171717",
      contrastText: "white",
    },
    background: {
      default: "#171717",
    },
  },
})

export const App = () => (
  <ThemeProvider theme={theme}>
    <MainLayout />
  </ThemeProvider>
)
