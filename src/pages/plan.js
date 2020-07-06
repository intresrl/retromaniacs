import React, {useState} from "react"
import {useStaticQuery, graphql} from "gatsby"
import Card from "../components/card";
import "../../static/style.css"
import Helmet from "react-helmet"
import Icon from "@material-ui/core/Icon"
import Button from "@material-ui/core/Button"
import { save } from "../utils/store"
import LoadDialog from "../components/LoadDialog"
import TextField from "@material-ui/core/TextField";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function Home() {

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

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

  const [loadOpened, setLoadOpened] = useState(false)

  const [currentRetro, setCurrentRetro] = useState({})

  const loadRetro = (retro) => {
      const sections = retro.sections
    setCurrentRetro(retro)
    setCard1(sections.card1)
    setCard2(sections.card2)
    setCard3(sections.card3)
    setCard4(sections.card4)
    setCard5(sections.card5)
  }


  return <div>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Helmet>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center"}}>
        <h1>{currentRetro.name || "New Retrospective"}</h1>
        <div>

          <TextField label="Retro Name" />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <Button variant="contained" color="primary" onClick={() => setLoadOpened(true)}>Load</Button>
          <Button style={{marginLeft: "5px"}} variant="contained" color="primary" onClick={() => save({ card1, card2, card3, card4, card5, })}>Save</Button>
        </div>
      </div>
      {loadOpened && <LoadDialog onSelect={loadRetro} onClose={() => setLoadOpened(false)}/>}
      <div>

        <h2>Set the stage</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card1 ? <><Card card={card1}/><Icon onClick={() => setCard1(null)}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard1(card)}
                                                      stage="set-the-stage"/>)
          }
        </div>
        <h2>Gather data</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card2 ? <><Card card={card2}/><Icon onClick={() => setCard2(null)}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard2(card)} stage="gather-data"/>)
          }
        </div>
        <h2>Generate insights</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card3 ? <><Card card={card3}/><Icon onClick={() => setCard3(null)}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard3(card)}
                                                      stage="generate-insight"/>)
          }
        </div>
        <h2>Decide what to do</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card4 ? <><Card card={card4}/><Icon onClick={() => setCard4(null)}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard4(card)}
                                                      stage="decide-what-to-do"/>)
          }
        </div>
        <h2>Close the retrospective</h2>
        <div style={{ display: 'flex', padding: "5px", textTransform: "none", overflow: "auto" }}>
          {card5 ? <><Card card={card5}/><Icon onClick={() => setCard5(null)}>close</Icon></> :
            data.allCardsYaml.nodes.map(card => <Card card={card} onClick={() => setCard5(card)}
                                                      stage="close-the-retrospective"/>)
          }
        </div>
      </div>
    </div>
  }
