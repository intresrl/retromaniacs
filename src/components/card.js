import React from 'react'

const Card = ({card}) => {
    return <div style={{border: "1px solid black", padding: "5px", maxWidth: "300px"}}>
        <h1>{card.name}</h1>
        <h2>{card.stage}</h2>
    </div>
}

export default Card
