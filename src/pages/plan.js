import React, {useState} from "react"
import {useStaticQuery, graphql} from "gatsby"
import Card from "../components/card";
import "../../static/style.css"
import Helmet from "react-helmet"
import Icon from "@material-ui/core/Icon"

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
  const [card2, setCard2] = useState(null)
  const [card3, setCard3] = useState(null)
  const [card4, setCard4] = useState(null)
  const [card5, setCard5] = useState(null)

    return <div>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Helmet>
      <h2>Set the stage</h2>
      <div style={{display: 'flex', padding: "5px", textTransform: "none", overflow: "auto"}}>
        {card1 ? <><Card card={card1}/><Icon onClick={() => setCard1(null)}>close</Icon></> :
          data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard1(card)}/>)
        }
      </div>
      <h2>Gather data</h2>
      <div style={{display: 'flex', padding: "5px", textTransform: "none", overflow: "auto"}}>
        {card2 ? <><Card card={card2}/><Icon onClick={() => setCard2(null)}>close</Icon></> :
          data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard2(card)}/>)
        }
      </div>
      <h2>Generate insights</h2>
      <div style={{display: 'flex', padding: "5px", textTransform: "none", overflow: "auto"}}>
        {card3 ? <><Card card={card3}/><Icon onClick={() => setCard3(null)}>close</Icon></> :
          data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard3(card)}/>)
        }
      </div>
      <h2>Decide what to do</h2>
      <div style={{display: 'flex', padding: "5px", textTransform: "none", overflow: "auto"}}>
        {card4 ? <><Card card={card4}/><Icon onClick={() => setCard4(null)}>close</Icon></> :
          data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard4(card)}/>)
        }
      </div>
      <h2>Close the retrospective</h2>
      <div style={{display: 'flex', padding: "5px", textTransform: "none", overflow: "auto"}}>
        {card5 ? <><Card card={card5}/><Icon onClick={() => setCard5(null)}>close</Icon></> :
          data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard5(card)}/>)
        }
      </div>
    </div>
}
