import { Theme, createStyles } from "@material-ui/core"

export const RootContainerStyles = (theme: Theme) =>
  createStyles({
    root: {
      "& h1,h4": {
        display: "flex",
        boxSizing: "border-box",
        margin: "0",
        fontWeight: "normal",
      },
      padding: theme.spacing(1),
      background: theme.palette.primary.dark,
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      width: "100vw",
      height: "100vh",
      color: "white",
      fontFamily: "Roboto",
      fontStyle: "regular",
    },
    title: {
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.primary.light,
      marginBottom: theme.spacing(1),
    },
  })
