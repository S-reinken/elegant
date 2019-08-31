import * as React from "react"
import { AccountPage } from "./AccountsPage"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core"
import { Page } from "../common/constants"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1C1C1C",
      light: "#262626",
      dark: "#171717"
    }
  }
})

const SamplePage: React.FunctionComponent<PageComponentProps> = ({}) => (
  <div></div>
)

interface PageControllerProps extends PageComponentProps {
  page: Page
}
const PageController: React.FunctionComponent<PageControllerProps> = ({
  page,
  setPage
}) => {
  switch (page) {
    case Page.ACCOUNTS_PAGE:
      return <AccountPage setPage={setPage} />
    default:
      return <SamplePage setPage={setPage} />
  }
}

export interface PageComponentProps {
  setPage: React.Dispatch<React.SetStateAction<Page>>
}

export const App = () => {
  const [currentPage, setPage] = React.useState(Page.ACCOUNTS_PAGE)
  return (
    <ThemeProvider theme={theme}>
      <PageController page={currentPage} setPage={setPage} />
    </ThemeProvider>
  )
}
