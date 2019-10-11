import * as React from "react"
import {AccountPage} from "../AccountsPage"
import {TransactionsPage} from "../TransactionsPage"
import {Page} from "@/renderer/common/constants"
import {mdiCreditCardMultiple, mdiFileCabinet} from "@mdi/js"
import Icon from "@mdi/react"
import {Theme, createStyles, WithStyles, withStyles} from "@material-ui/core"
import {CategoriesPage} from "../CategoriesPage"
import {styles} from "./Styles"

const pageMap: React.FunctionComponent<PageComponentProps>[] = [
  AccountPage,
  TransactionsPage,
  CategoriesPage,
]

export interface PageComponentProps {
  setPage: React.Dispatch<React.SetStateAction<Page>>
}

export const MainLayoutComponent: React.FunctionComponent<
  WithStyles<typeof styles>
> = ({classes}) => {
  const [currentPage, setPage] = React.useState(Page.ACCOUNTS_PAGE)
  const PageComponent = pageMap[currentPage]
  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <div onClick={() => setPage(Page.ACCOUNTS_PAGE)}>
          <Icon path={mdiCreditCardMultiple} className={classes.icon} />
        </div>
        <div onClick={() => setPage(Page.CATEGORIES_PAGE)}>
          <Icon path={mdiFileCabinet} className={classes.icon} />
        </div>
      </div>
      <PageComponent setPage={setPage} />
    </div>
  )
}

export const MainLayout = withStyles(styles)(MainLayoutComponent)
