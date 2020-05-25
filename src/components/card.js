import React from 'react'
import {Link} from "gatsby";

const Card = ({card}) => {
    return <div style={{border: "1px solid black", padding: "5px", maxWidth: "300px"}}>
        <Link to={`/cards/${card.id}`}>
        <h1>{card.name}</h1>
        <h2>{card.stage}</h2>
        <p>{`Tempo: da ${card.timeNeeded.min} a ${card.timeNeeded.max} minuti`}</p>
        <p>{`Scopo ${card.needSolved}`}</p>
    </Link>
    </div>
}

export default Card
