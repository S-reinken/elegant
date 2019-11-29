import * as React from "react"
import {AccountPage} from "../AccountsPage"
import {TransactionsPage} from "../TransactionsPage"
import {Page} from "@/renderer/common/constants"
import {mdiCreditCardMultiple, mdiFileCabinet, mdiHomeGroup} from "@mdi/js"
import Icon from "@mdi/react"
import {Theme, createStyles, WithStyles, withStyles} from "@material-ui/core"
import {CategoriesPage} from "../CategoriesPage"
import {styles} from "./Styles"
import {MappingsPage} from "../MappingsPage"

const pageMap: React.FunctionComponent<PageComponentProps>[] = [
  AccountPage,
  TransactionsPage,
  CategoriesPage,
  MappingsPage,
]

export interface PageComponentProps {
  setPage: React.Dispatch<React.SetStateAction<{component: Page; props: any}>>
}

export const MainLayoutComponent: React.FunctionComponent<WithStyles<
  typeof styles
>> = ({classes}) => {
  const [{component, props}, setPage] = React.useState({
    component: Page.ACCOUNTS_PAGE,
    props: {},
  })
  const PageComponent = pageMap[component]
  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <div
          onClick={() => setPage({component: Page.ACCOUNTS_PAGE, props: {}})}
        >
          <Icon path={mdiCreditCardMultiple} className={classes.icon} />
        </div>
        <div
          onClick={() => setPage({component: Page.CATEGORIES_PAGE, props: {}})}
        >
          <Icon path={mdiFileCabinet} className={classes.icon} />
        </div>
        <div
          onClick={() => setPage({component: Page.MAPPINGS_PAGE, props: {}})}
        >
          <Icon path={mdiHomeGroup} className={classes.icon} />
        </div>
      </div>
      <PageComponent setPage={setPage} {...props} />
    </div>
  )
}

export const MainLayout = withStyles(styles)(MainLayoutComponent)
