import React from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import Card from "../components/card";

export default function Home() {
    const data = useStaticQuery(graphql`
        query MyQuery {
          allCardsYaml {
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
  `)

    return <div>
        {data.allCardsYaml.nodes.map(card => <Link to={`/cards/${card.id}`}><Card card={card} /></Link>)}</div>
}
