import * as React from "react"
import {ThemeProvider} from "@material-ui/styles"
import {createMuiTheme} from "@material-ui/core"
import {MainLayout} from "./Layout"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2C2C2C",
      light: "#363636",
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
