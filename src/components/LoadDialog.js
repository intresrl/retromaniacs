import React, { useEffect, useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import Grid from "@material-ui/core/Grid"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import { load } from "../utils/store"

const LoadDialog = (props) => {
  const onClose = props.onClose

  const [retro, setRetro] = useState([])

  useEffect(() => {
    let promise = load()
    promise.then(r => {
      console.log("roobbbaa", r)
      setRetro(r)
    })
  }, [])


  return (
    <Dialog open={true} onClose={onClose}>
      {retro.map((r) => {
        return <div onClick={() => {
          props.onClose()
          props.onSelect(r)
        }}>
          {r.name}
        </div>
      })}
      <DialogActions>
        <Button onClick={onClose} style={{backgroundColor: "rgb(102, 189, 181)", color:"white"}}>
          Chiudi
        </Button>
        {/*<Button onClick={(e) =>selectCard()} style={{backgroundColor: "rgb(102, 189, 181)", color:"white"}}>*/}
        {/*  Seleziona*/}
        {/*</Button>*/}
      </DialogActions>
    </Dialog>
  )
}

export default LoadDialog
