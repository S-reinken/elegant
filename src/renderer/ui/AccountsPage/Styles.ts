import { Theme, createStyles } from "@material-ui/core"

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      "& h1,h4": {
        display: "flex",
        boxSizing: "border-box",
        margin: "0",
        fontWeight: "normal"
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
      fontStyle: "regular"
    },
    title: {
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.primary.light,
      marginBottom: theme.spacing(1)
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
        backgroundColor: theme.palette.primary.light
      }
    }
  })
