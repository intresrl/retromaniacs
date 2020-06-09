import React, { useState } from "react"
import {Link} from "gatsby";
import Icon from "@material-ui/core/Icon"
import { makeStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import CardTemplate from "./cardTemplate"

const useStyles = makeStyles({
    root: {
      position: "relative"
    },
    topRight: {
        position: "absolute",
        top: "10px",
        right: "10px"
    },
    modal: {
        padding: "30px"
    }
});

const Card = ({card}) => {

    const classes = useStyles();
    const [modalState, setModalState] = useState(false); // {open: boolean, cardId : string}


    return <div className={classes.root} style={{margin: '5px', border: "1px solid black", padding: "5px", maxWidth: "300px"}}>

        <Dialog open={modalState} onClose={() => {setModalState(false)}}>
            <div className={classes.modal}>
                <h1>{card.name}</h1>
                <h2>{card.stage.join(", ")}</h2>
                <p>{`Tempo: da ${card.timeNeeded.min} a ${card.timeNeeded.max} minuti`}</p>
                <p>{`Scopo ${card.needSolved}`}</p>
            </div>
        </Dialog>

        <Icon className={classes.topRight} onClick={() => {
            setModalState(true)
        }}>info</Icon>
        <Link to={`/cards/${card.id}`}>
        <h1>{card.name}</h1>
        <h2>{card.stage.join(", ")}</h2>
        <p>{`Tempo: da ${card.timeNeeded.min} a ${card.timeNeeded.max} minuti`}</p>
        <p>{`Scopo ${card.needSolved}`}</p>
    </Link>
    </div>
}

export default Card
