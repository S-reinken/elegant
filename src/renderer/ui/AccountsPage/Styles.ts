import {Theme, createStyles} from "@material-ui/core"
import {RootContainerStyles} from "@/renderer/common/styles/RootStyles"

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...RootContainerStyles(theme).root,
    },
    title: {
      ...RootContainerStyles(theme).title,
    },
    paper: {
      borderRadius: "0",
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      justifyContent: "space-between",
      alignItems: "flex-start",
      background: theme.palette.primary.main,
      padding: theme.spacing(1),
      color: "white",
      height: "100px",
      width: "200px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  })
