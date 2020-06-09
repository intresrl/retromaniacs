import React from 'react'
import {Link} from "gatsby";

const Card = ({card, onClick}) => {
    return <div  onClick={onClick} style={{margin: '5px', border: "1px solid black", padding: "5px", maxWidth: "300px", minWidth: "300px"}}>
        <h1>{card.name}</h1>
        <h2>{card.stage.join(", ")}</h2>
        <p>{`Tempo: da ${card.timeNeeded.min} a ${card.timeNeeded.max} minuti`}</p>
        <p>{`Scopo ${card.needSolved}`}</p>
    </div>
}

export default Card
