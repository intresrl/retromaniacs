import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import Card from "../components/card";
import "../../static/style.css"
import Helmet from "react-helmet"

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
                timeNeeded {
                    min
                    max
                }
              }
          }
        }
  `)

    return <div style={{display: 'flex', padding: "5px", textTransform: "none", flexWrap: "wrap"}}>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Helmet>
        {data.allCardsYaml.nodes.map(card => <Card card={card} />)}
    </div>
}
