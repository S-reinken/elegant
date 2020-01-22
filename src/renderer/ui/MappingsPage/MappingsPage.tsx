import * as React from "react"
import {PageComponentProps} from "../Layout"
import {mergeClasses, WithStyles, createStyles} from "@material-ui/styles"
import {styles} from "./Styles"
import {withStyles, Select, MenuItem, Theme} from "@material-ui/core"
import {TextField} from "@material-ui/core"
import {Account, Alias} from "@common/types"
import {pipe} from "fp-ts/lib/pipeable"
import {getAccounts, getAliases} from "@renderer/common/functions"
import {err, trace} from "@common/functions"
import {task} from "fp-ts/lib/Task"
import {fold} from "fp-ts/lib/TaskEither"
import {map} from "fp-ts/lib/Array"

interface MappingsPageProps extends PageComponentProps {}

interface MappingsPageComponentProps extends WithStyles<typeof styles> {
  accounts: Account[]
  aliases: Alias[]
}

interface MappingSelectProps extends WithStyles<typeof mappingSelectStyles> {
  initialMapping: Alias
  options: JSX.Element[]
}
const mappingSelectStyles = (theme: Theme) =>
  createStyles({
    textField: {
      padding: "4px",
      marginRight: "8px",
      backgroundColor: theme.palette.primary.main,
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
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  })
const MappingSelectComponent: React.FunctionComponent<MappingSelectProps> = ({
  initialMapping,
  options,
  classes,
}) => {
  const [mapping, setMapping] = React.useState(initialMapping)
  return (
    <div>
      <TextField className={classes.textField} value={mapping.alias} />
      <Select
        className={classes.select}
        value={mapping.accountId}
        onChange={e => {
          setMapping({
            ...mapping,
            accountId: e.target.value as number,
          })
        }}
      >
        {options}
      </Select>
    </div>
  )
}

const MappingSelect = withStyles(mappingSelectStyles)(MappingSelectComponent)

const makeOptions = map((account: Account) => (
  <MenuItem value={account.id}>{account.name}</MenuItem>
))

export const MappingsPageComponent: React.FunctionComponent<MappingsPageComponentProps> = ({
  classes,
  accounts,
  aliases,
}) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <h1>Edit Mappings</h1>
    </div>
    <div>
      <h3>American Express</h3>
      {aliases.map(alias => (
        <MappingSelect initialMapping={alias} options={makeOptions(accounts)} />
      ))}
    </div>
  </div>
)

export const MappingsPage: React.FunctionComponent<MappingsPageProps> = setPage => {
  const initialMappings = [] as Alias[]
  const [mappings, setMappings] = React.useState(initialMappings)
  const [rowArray, setRows] = React.useState([] as Account[])
  const getRows = pipe(
    getAccounts,
    fold(err, a => task.of(setRows(a)))
  )
  const getMappings = pipe(
    getAliases,
    fold(err, a => task.of(setMappings(a)))
  )

  React.useEffect(() => {
    getRows()
    getMappings()
  }, [])

  const Component = withStyles(styles)(MappingsPageComponent)
  return <Component accounts={rowArray} aliases={mappings} />
}
