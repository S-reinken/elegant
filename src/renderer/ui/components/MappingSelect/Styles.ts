import {Theme, createStyles} from "@material-ui/core"

export const mappingSelectStyles = (theme: Theme) =>
  createStyles({
    textField: {
      padding: "4px",
      marginRight: "8px",
      backgroundColor: theme.palette.primary.dark,
      "& .MuiInput-underline:before": {
        borderBottomColor: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "white",
      },
      "& input": {
        color: "white",
        width: "400px",
      },
    },
    select: {
      padding: "4px",
      width: "200px",
      "& .MuiInput-underline:before": {
        borderBottomColor: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "white",
      },
      "& .MuiSelect-icon": {
        color: "white",
      },
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
  })
