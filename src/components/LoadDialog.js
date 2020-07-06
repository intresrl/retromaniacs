import React, { useEffect, useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import { load } from "../utils/store"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import DialogTitle from "@material-ui/core/DialogTitle"

const LoadDialog = (props) => {
  const onClose = props.onClose

  const [retro, setRetro] = useState([])

  useEffect(() => {
    let promise = load()
    promise.then(r => {
      setRetro(r)
    })
  }, [])


  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Load saved retrospective</DialogTitle>
      <List component="nav" aria-label="secondary mailbox folders">
        {retro.map((r) => {
          const label = `${r.name} (${r.date.toLocaleDateString()})`;
        return <ListItem key={r.name} button onClick={() => {
              props.onClose()
              props.onSelect(r)
            }}>
              <ListItemText primary={label} />
            </ListItem>
      })}
      </List>
      <DialogActions>
        <Button onClick={onClose} style={{backgroundColor: "rgb(102, 189, 181)", color:"white"}}>
          Chiudi
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoadDialog
