import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query($id: String!) {
       allCardsYaml (filter: {id: {eq: $id}}){
              nodes {
                id
                difficulty
                materials
                name
                needSolved
                timeNeeded {
                    min
                    max
                }
                plus
                stage
                steps
              }
          }
  }
`;


const CardTemplate = (props) => {
    const card = props.data.allCardsYaml.nodes[0];

    return <div style={{border: "1px solid black", padding: "5px", maxWidth: "300px"}}>
        <h1>{card.name}</h1>
        <h2>{card.stage.join(",")}</h2>
        <h3>Props</h3>
        <p>{`Tempo: da ${card.timeNeeded.min} a ${card.timeNeeded.max} minuti`}</p>
        <p>{`Difficoltà ${card.difficulty}`}</p>
        <p>{`Scopo: ${card.needSolved}`}</p>
        <h3>Steps</h3>
        <ul>
            {card.steps.map(step => <li>{step}</li>)}
        </ul>
        <h3>Plus</h3>
        <ul>
            {card.plus.map(step => <li>{step}</li>)}
        </ul>
        <h3>Materiali</h3>
        <ul>
            {card.materials.map(step => <li>{step}</li>)}
        </ul>
    </div>

};

export default CardTemplate;


