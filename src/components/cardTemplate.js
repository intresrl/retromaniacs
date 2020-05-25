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
        <h2>{card.stage}</h2>
    </div>

};

export default CardTemplate;


