import * as React from "react"
import {PageComponentProps} from "../Layout"
import {mergeClasses, WithStyles} from "@material-ui/styles"
import {styles} from "./Styles"
import {withStyles, Select, MenuItem} from "@material-ui/core"
import {TextField} from "@material-ui/core"
import {Account, Alias} from "@common/types"
import {pipe} from "fp-ts/lib/pipeable"
import {getAccounts} from "@renderer/common/functions"
import {err} from "@common/functions"
import {task} from "fp-ts/lib/Task"
import {fold} from "fp-ts/lib/TaskEither"
import {map} from "fp-ts/lib/Array"

interface MappingsPageProps extends PageComponentProps {}

interface MappingsPageComponentProps extends WithStyles<typeof styles> {
  accounts: Account[]
  aliases: Alias[]
}

interface MappingSelectProps {
  initialMapping: Alias
  options: JSX.Element[]
}
const MappingSelect: React.FunctionComponent<MappingSelectProps> = ({
  initialMapping,
  options,
}) => {
  const [mapping, setMapping] = React.useState(initialMapping)
  return (
    <div>
      <TextField value={mapping.alias} />
      <Select>{options}</Select>
    </div>
  )
}

const makeOptions = map((account: Account) => (
  <MenuItem>{account.name}</MenuItem>
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
        <MappingSelect
          initialMapping={{alias: "Restaurant-Restaurant", account: 1}}
          options={makeOptions(accounts)}
        />
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

  React.useEffect(() => {
    getRows()
    setMappings([{alias: "Restaurants-Restaurants", account: 1}])
  }, [])

  const Component = withStyles(styles)(MappingsPageComponent)
  return <Component accounts={rowArray} aliases={mappings} />
}
