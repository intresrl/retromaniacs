import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import Icon from "@material-ui/core/Icon"
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles({
    root: {
        maxWidth: "300px",
        minWidth: "300px",
        border: "1px solid grey",
        padding: "5px",
        position: "relative"
    },
    name: {
        textAlign: "center",
        marginBottom: "20px",
        fontSize: "25px",
        fontWeight: "600",
        color: "#303031"
    },
    stage: {
        textAlign: "center",
        marginBottom: "5px"
    },
    materials: {
        textAlign: "center",
        marginBottom: "8px",
        fontWeight: "600",
        color: "#3f3f3f"
    },
    scope: {
        textAlign: "center",
        marginBottom: "8px",
        fontSize: "20px",
        color: "#5da8a2"
    },
    advantages: {
        textAlign: "center"
    },
    exampleTitle: {
        textAlign: "center",
        fontSize: "20px",
        marginBottom: "15px"
    },
    example: {
        textAlign: "left",
        marginBottom: "15px",
        padding: "10px",
        fontSize: "16px"
    },
    meta: {
        textAlign: "center"
    },
    topRight: {
        position: "absolute",
        top: "10px",
        right: "10px"
    },
})

export default function Card(props) {
    const {
        card,
        onClick
    } = props
    const classes = useStyles()
    const [modalState, setModalState] = useState(false); // {open: boolean, cardId : string}
    
    const selectCard = () => {
        props.onClick();
        setModalState(false)
    }

    return (
      <div className={classes.root}>
          <Dialog open={modalState} onClose={(e) => {
              e.stopPropagation()
              setModalState(false)
          }}>
              <Grid container style={{padding: "30px"}}>
                  <Grid item xs={12} className={classes.name}>
                      {card.name}
                  </Grid>
                  <Grid item xs={12} className={classes.stage}>
                      {card.stage.map(s => (
                        <Stage stage={s}/>
                      ))}
                  </Grid>
                  <Grid item xs={12} className={classes.materials}>
                      <Materials materials={card.materials}/>
                  </Grid>
                  <Grid item xs={12} className={classes.scope}>
                      {card.needSolved}
                  </Grid>
                  <Grid item xs={12} className={classes.advantages}>
                      <Materials materials={card.plus}/>
                  </Grid>
                  <OurDivider />
                  <Grid item xs={12} className={classes.exampleTitle}>
                      Example
                  </Grid>
                  <Grid item xs={12} className={classes.example}>
                      {card.steps.map(step => <li>{step}</li>)}
                  </Grid>
                  <Grid item xs={12} className={classes.meta}>
                      <Grid container>
                          <Grid item xs={4}>
                              <div style={{ marginBottom: "10px", fontWeight: "600" }}>Duration</div>
                              <div>{card.timeNeeded.min}-{card.timeNeeded.max} min</div>
                          </Grid>
                          <Grid item xs={4}>
                              <div style={{ marginBottom: "10px", fontWeight: "600" }}>Group</div>
                              <div>&lt; NaN persons</div>
                          </Grid>
                          <Grid item xs={4}>
                              <div style={{ marginBottom: "10px", fontWeight: "600" }}>Difficulty</div>
                              {Array.apply(null, { length: card.difficulty }).map(() => (
                                <Box enabled={true}/>
                              ))}
                              {Array.apply(null, { length: 3 - card.difficulty }).map(() => (
                                <Box enabled={false}/>
                              ))}
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
              <DialogActions>
                  <Button onClick={(e) =>setModalState(false)} style={{backgroundColor: "rgb(102, 189, 181)", color:"white"}}>
                      Chiudi
                  </Button>
                  <Button onClick={(e) =>selectCard()} style={{backgroundColor: "rgb(102, 189, 181)", color:"white"}}>
                      Seleziona
                  </Button>
              </DialogActions>
          </Dialog>

          <Icon className={classes.topRight} onClick={(e) => {
              e.stopPropagation()
              setModalState(true)
          }}>info</Icon>

          <Grid container style={{marginTop: "15px"}} onClick={onClick}>
              <Grid item xs={12} className={classes.name}>
                  {card.name}
              </Grid>
              <Grid item xs={12} className={classes.stage}>
                  {card.stage.map(s => (
                    <Stage stage={s}/>
                  ))}
              </Grid>
              <Grid item xs={12} className={classes.materials}>
                  <Materials materials={card.materials}/>
              </Grid>
              <Grid item xs={12} className={classes.scope}>
                  {card.needSolved}
              </Grid>
              <Grid item xs={12} className={classes.advantages}>
                  <Materials materials={card.plus}/>
              </Grid>
              <OurDivider />
              <Grid item xs={12} className={classes.meta}>
                  <Grid container>
                      <Grid item xs={4}>
                          <div style={{ marginBottom: "10px", fontWeight: "600" }}>Duration</div>
                          <div>{card.timeNeeded.min}-{card.timeNeeded.max} min</div>
                      </Grid>
                      <Grid item xs={4}>
                          <div style={{ marginBottom: "10px", fontWeight: "600" }}>Group</div>
                          <div>&lt; NaN persons</div>
                      </Grid>
                      <Grid item xs={4}>
                          <div style={{ marginBottom: "10px", fontWeight: "600" }}>Difficulty</div>
                          {Array.apply(null, { length: card.difficulty }).map(() => (
                            <Box enabled={true}/>
                          ))}
                          {Array.apply(null, { length: 3 - card.difficulty }).map(() => (
                            <Box enabled={false}/>
                          ))}
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
      </div>
    )
}

function OurDivider(){
    return <div
      style={{
          width: "100%",
          height: "2px",
          backgroundColor: "#aedad7",
          margin: "0 40px 20px 40px"
      }}
    />
}

function Box({ enabled }) {
    return (
      <div
        style={{
            height: "15px",
            width: "15px",
            backgroundColor: enabled ? "#66bdb5" : "#e5e4e4",
            display: "inline-block",
            margin: "0 5px"
        }}
      />
    )
}

function Stage({ stage }) {
    return (
      <span
        style={{
            backgroundColor: "#66bdb5",
            margin: "0 5px",
            padding: "8px",
            color: "white"
        }}
      >
      {stage}
    </span>
    )
}

function Materials({ materials }) {
    return (
      <div>
          <ul style={{ padding: "0" }}>
              {materials.map(m => (
                <>
                    &bull;
                    <li style={{ display: "inline", margin: "0 5px" }}>{m}</li>
                </>
              ))}
          </ul>
      </div>
    )
}
