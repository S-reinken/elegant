import {Theme, createStyles} from "@material-ui/core"

export const styles = (theme: Theme) =>
  createStyles({
    root: {display: "flex", justifyContent: "stretch"},
    sidebar: {width: "60px", background: theme.palette.primary.main},
    icon: {
      fill: "gray",
      "&:hover": {
        fill: "white",
      },
    },
  })
