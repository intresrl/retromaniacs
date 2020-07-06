import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import Icon from "@material-ui/core/Icon"

const RetroTitle = ({currentRetro, setCurrentRetro}) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState();
  const [date, setDate] = useState();

  const doEdit = () => {
    setName(currentRetro.name)
    setDate(currentRetro.date)
    setEdit(true)
  }

  const cancel = () => {
    setEdit(false)
  }

  const save = () => {
    setCurrentRetro({...currentRetro, name, date});
    cancel()
  }

  if (!edit) {
    const d = currentRetro.date;
    return <div style={{display: "flex", alignItems: "center"}}>
      <h1>{currentRetro.name} ({d.getDate()}/{d.getMonth()+1}/{d.getFullYear()})</h1>
      <Icon style={{cursor: "pointer"}} color="primary" onClick={doEdit}>edit</Icon>
    </div>
  }

  return <div style={{display: "flex", alignItems: "stretch"}}>
    <TextField label="Retro Name" value={name} onChange={e => setName(e.target.value)}/>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format={"dd/MM/yyyy"}
      margin="normal"
      id="date-picker"
      value={date}
      onChange={setDate}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  </MuiPickersUtilsProvider>
    <div style={{display: "flex", alignItems: "center"}}>
      <Icon style={{cursor: "pointer"}} color="secondary" onClick={cancel}>close</Icon>
      <Icon style={{cursor: "pointer"}} color="primary" onClick={save}>check</Icon>
    </div>
  </div>
}

export default RetroTitle
