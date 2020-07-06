import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Card from "../components/card"
import "../../static/style.css"
import Helmet from "react-helmet"
import Icon from "@material-ui/core/Icon"
import Button from "@material-ui/core/Button"
import { save } from "../utils/store"
import LoadDialog from "../components/LoadDialog"
import RetroTitle from "../components/retroTitle"
import Badge from "@material-ui/core/Badge";

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
  const [badgeInvisible, setBadgeInvisible] = useState(true)

  const [loadOpened, setLoadOpened] = useState(false)

  const [currentRetro, setCurrentRetro] = useState({name: "New Retrospective", date: new Date()})

  const loadRetro = (retro) => {
    setBadgeInvisible(true)
      const sections = retro.sections
    setCurrentRetro(retro)
    setCard1(sections.card1)
    setCard2(sections.card2)
    setCard3(sections.card3)
    setCard4(sections.card4)
    setCard5(sections.card5)
  }

  const editTitleDetail = (retro) => {
    setCurrentRetro(retro);
    setBadgeInvisible(false)
  }

  return <div>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Helmet>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center"}}>
          <RetroTitle currentRetro={currentRetro} setCurrentRetro={editTitleDetail}/>
        <div>
          <Button variant="contained" color="primary" onClick={() => setLoadOpened(true)}>Load</Button>
          <Badge color="secondary" variant="dot" invisible={badgeInvisible}>
            <Button style={{marginLeft: "5px"}} variant="contained" color="primary" onClick={() => {setBadgeInvisible(true); save({...currentRetro, sections: { card1, card2, card3, card4, card5, }})}}>Save</Button>
          </Badge>
        </div>
      </div>
      {loadOpened && <LoadDialog onSelect={loadRetro} onClose={() => setLoadOpened(false)}/>}
      <div>

        <h2>Set the stage</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card1 ? <><Card card={card1}/><Icon onClick={() =>{setBadgeInvisible(false);  setCard1(null)}}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => {setBadgeInvisible(false); setCard1(card)}}
                                                      stage="set-the-stage"/>)
          }
        </div>
        <h2>Gather data</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card2 ? <><Card card={card2}/><Icon onClick={() => {setBadgeInvisible(false); setCard2(null)}}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => {setBadgeInvisible(false); setCard2(card)}} stage="gather-data"/>)
          }
        </div>
        <h2>Generate insights</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card3 ? <><Card card={card3}/><Icon onClick={() => {setBadgeInvisible(false); setCard3(null)}}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => {setBadgeInvisible(false); setCard3(card)}}
                                                      stage="generate-insight"/>)
          }
        </div>
        <h2>Decide what to do</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card4 ? <><Card card={card4}/><Icon onClick={() =>{setBadgeInvisible(false);  setCard4(null)}}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => {setBadgeInvisible(false); setCard4(card)}}
                                                      stage="decide-what-to-do"/>)
          }
        </div>
        <h2>Close the retrospective</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card5 ? <><Card card={card5}/><Icon onClick={() => {setBadgeInvisible(false); setCard5(null)}}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => {setBadgeInvisible(false); setCard5(card)}}
                                                      stage="close-the-retrospective"/>)
          }
        </div>
      </div>
    </div>
  }
