import React, {useState} from "react"
import {useStaticQuery, graphql} from "gatsby"
import Card from "../components/card";
import "../../static/style.css"
import Helmet from "react-helmet"

export default function Home() {
    const data = useStaticQuery(graphql`
        query MyOtherQuery {
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

  const [card1, setCard1] = useState(null)

    return <div>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Helmet>
      <h2>Set the stage</h2>
      <div style={{display: 'flex', padding: "5px", textTransform: "none", overflow: "auto"}}>
        {card1 ? <Card card={card1}/> :
          data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard1(card)}/>)
        }
      </div>
    </div>
}
