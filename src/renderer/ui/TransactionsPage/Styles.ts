import { Theme, createStyles } from "@material-ui/core"
import { RootContainerStyles } from "@/renderer/common/styles/RootStyles"

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...RootContainerStyles(theme).root,
    },
    title: {
      ...RootContainerStyles(theme).title,
    },
    table: {
      color: "white",
      "& th,tr,td": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        borderBottom: `0.5px solid ${theme.palette.primary.light}`
      },
      minWidth: 650,
    },
  })
