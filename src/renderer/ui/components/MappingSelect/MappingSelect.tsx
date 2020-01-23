import * as React from "react"
import {WithStyles, withStyles} from "@material-ui/styles"
import {mappingSelectStyles} from "./Styles"
import {Alias} from "@common/types"
import {setAlias} from "@renderer/common/functions"
import {flow} from "fp-ts/lib/function"
import {TextField} from "material-ui"
import {Select} from "@material-ui/core"

interface MappingSelectProps extends WithStyles<typeof mappingSelectStyles> {
  initialMapping: Alias
  options: JSX.Element[]
}
const MappingSelectComponent: React.FunctionComponent<MappingSelectProps> = ({
  initialMapping,
  options,
  classes,
}) => {
  const [mapping, setMapping] = React.useState(initialMapping)
  const changeMap = (a: Alias) => {
    setMapping(a)
    setAlias(a)()
  }
  const getAliasFromTextField = (
    e: React.ChangeEvent<HTMLInputElement>
  ): Alias => ({
    ...mapping,
    alias: e.target.value,
  })
  const getAliasFromDropdown = (
    e: React.ChangeEvent<{value: unknown}>
  ): Alias => ({
    ...mapping,
    accountId: e.target.value as number,
  })
  const changeAlias = flow(getAliasFromTextField, changeMap)
  const changeAccount = flow(getAliasFromDropdown, changeMap)
  return (
    <div>
      <TextField
        className={classes.textField}
        value={mapping.alias}
        onChange={changeAlias}
      />
      <Select
        className={classes.select}
        value={mapping.accountId}
        onChange={changeAccount}
      >
        {options}
      </Select>
    </div>
  )
}

export const MappingSelect = withStyles(mappingSelectStyles)(
  MappingSelectComponent
)
